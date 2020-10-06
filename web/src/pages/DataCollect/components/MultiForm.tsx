import React from 'react';
import { Modal,Form } from 'antd';

import { InvestmentRecord } from '../data.d';
import TableForm,{TableFormDateType} from '../ModelForm';

export interface FormValueType extends Partial<InvestmentRecord> {
}
//擴展構造緩存數據模型
export interface tableDataTemp extends InvestmentRecord {
    key?: string,
};

export interface UpdateFormProps {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: InvestmentRecord[]) => void;
    updateModalVisable: boolean;
    tableData: tableDataTemp[];
}


const MultiFrom: React.FC<UpdateFormProps> = (props) => {  
    const [form] = Form.useForm();        
    const {
        onCancel: handleUpdateModalVisible,
        onSubmit: handleUpdate,
        updateModalVisable,
        tableData,
    } = props;

    //構造假數據測試接口
    const summitData:InvestmentRecord[]=[
        // {
        //     id: 'Test1',
        //     trasdate: '2020-8-1 11:28:15',
        //     operator: 'Test',
        //     otype: 'Test',
        //     fundcode: '110022',
        //     amount: 500,
        //     platform:'Test',
        //     events: 'Test',
        // },
        // {
        //     id: 'Test2',
        //     trasdate: '2020-8-1 11:25:15',
        //     operator: 'Test',
        //     otype: 'Test',
        //     fundcode: '110532',
        //     amount: 1500,
        //     platform:'Test',
        //     events: 'Test',
        // },
    ]; 
    //整理數據函數
    const getSubmitData=(fields:TableFormDateType[])=>{
        //賦值之前先清空
        summitData.length=0;
        for(let i=0;i<fields.length;i++){
            summitData.push(
                {
                    id: fields[i].id,
                    trasdate: fields[i].trasdate,
                    operator: fields[i].operator,
                    otype: fields[i].otype,
                    fundcode: fields[i].fundcode,
                    amount: fields[i].amount,
                    platform: fields[i].platform,
                    events: fields[i].events,                    
                }
            );           
        }
    };  

    return (

        <Modal
            title="批量新增/更新記錄"
            okText="提交"
            width={'90%'}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            visible={updateModalVisable}
            onCancel={() => handleUpdateModalVisible()}
            onOk={()=>handleUpdate(summitData)}
        >
            <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                initialValues={{ members: tableData }}
            >
                <Form.Item name="members">
                    <TableForm 
                    onChange={async (value) => {
                        getSubmitData(value);
                      }}
                    />
                </Form.Item>
            </Form>
        </Modal>

    );
};

export default MultiFrom;