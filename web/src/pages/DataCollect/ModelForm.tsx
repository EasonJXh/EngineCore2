import { PlusOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import { InvestmentRecord } from './data'

import styles from './style.less';

//擴展Model
export interface TableFormDateType extends InvestmentRecord {
    key: string,
    isNew?: boolean;
    editable?: boolean;
}

//定義組件初始化屬性
interface TableFormProps {
    value?: TableFormDateType[];
    onChange?: (value: TableFormDateType[]) => void;
}

//定義組件
const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
    const [clickedCancel, setClickedCancel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [cacheOriginData, setCacheOriginData] = useState({});
    const [data, setData] = useState(value);
    const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
        (newData || data)?.filter((item) => item.key === key)[0];

    const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
        e.preventDefault();
        const newData = data?.map((item) => ({ ...item }));
        const target = getRowByKey(key, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                cacheOriginData[key] = { ...target };
                setCacheOriginData(cacheOriginData);
            }
            target.editable = !target.editable;
            setData(newData);
        }
    };
    const newMember = () => {
        const newData = data?.map((item) => ({ ...item })) || [];
        newData.push({
            key: `NEW_TEMP_ID_${index}`,
            id: '',
            trasdate: '',
            operator: '',
            otype: '',
            fundcode: '',
            amount: 0,
            platform: '',
            events: '',
            editable: true,
            isNew: true,
        });

        setIndex(index + 1);
        setData(newData);
    };
    const remove = (key: string) => {
        const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
        setData(newData);
        if (onChange) {
            onChange(newData);
        }
    };
    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string,
        key: string,
    ) => {
        const newData = [...(data as TableFormDateType[])];
        const target = getRowByKey(key, newData);
        if (target) {
            target[fieldName] = e.target.value;
            setData(newData);
        }
    };
    const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
        e.persist();
        setLoading(true);
        setTimeout(() => {
            if (clickedCancel) {
                setClickedCancel(false);
                return;
            }
            const target = getRowByKey(key) || ({} as any);
            if (!target.fundcode || !target.operator || !target.trasdate) {
                message.error('請填寫完整的信息');
                (e.target as HTMLInputElement).focus();
                setLoading(false);
                return;
            }
            delete target.isNew;
            toggleEditable(e, key);
            if (onChange) {
                onChange(data as TableFormDateType[]);
            }
            setLoading(false);
        }, 500);
    };
    const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
        if (e.key === 'Enter') {
            saveRow(e, key);
        }
    };
    const cancel = (e: React.MouseEvent, key: string) => {
        setClickedCancel(true);
        e.preventDefault();
        const newData = [...(data as TableFormDateType[])];
        // 编辑前的原始数据
        let cacheData = [];
        cacheData = newData.map((item) => {
            if (item.key === key) {
                if (cacheOriginData[key]) {
                    const originItem = {
                        ...item,
                        ...cacheOriginData[key],
                        editable: false,
                    };
                    delete cacheOriginData[key];
                    setCacheOriginData(cacheOriginData);
                    return originItem;
                }
            }
            return item;
        });
        setData(cacheData);
        setClickedCancel(false);
    };
    const columns = [
        {
            title: '唯一識別碼',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (                        
                        <Input
                            value={text}                            
                            placeholder="唯一碼"
                            readOnly={true}
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '操作日期',
            dataIndex: 'trasdate',
            key: 'trasdate',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            style={{ width: '100%' }}
                            placeholder="請選擇操作時間" 
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'trasdate', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}                       
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'operator', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="操作人"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '操作類型',
            dataIndex: 'otype',
            key: 'otype',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'otype', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="操作類型"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '代碼',
            dataIndex: 'fundcode',
            key: 'fundcode',
            //width: '40%',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'fundcode', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="代碼"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '金額',
            dataIndex: 'amount',
            key: 'amount',
            //width: '40%',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'amount', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="金額"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
            //width: '40%',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'platform', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="平台"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '事件',
            dataIndex: 'events',
            key: 'events',
            //width: '40%',
            render: (text: string, record: TableFormDateType) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'events', record.key)}
                            onKeyPress={(e) => handleKeyPress(e, record.key)}
                            placeholder="事件"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '操作',
            key: 'action',
            width:'8%',
            render: (text: string, record: TableFormDateType) => {
                if (!!record.editable && loading) {
                    return null;
                }
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                                <Divider type="vertical" />
                                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={(e) => saveRow(e, record.key)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={(e) => cancel(e, record.key)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];
    return (
        <>
            <Table<TableFormDateType>
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={false}                
                rowClassName={(record) => (record.editable ? styles.editable : '')}
            />
            <Button
                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                type="dashed"
                onClick={newMember}
            >
                <PlusOutlined />
            新增記錄
          </Button>
        </>
    );
}

export default TableForm;