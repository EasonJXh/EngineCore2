import React, { useState, useRef } from 'react';
import { Button, Dropdown, Menu, message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { InvestmentRecord, delIdList } from './data.d';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import MultiFrom from './components/MultiForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryRecords, removeRecords, addRrecords, updateRecords, multiDealData } from './service';

//擴展InvestmentRecord
interface tableDataTemp extends InvestmentRecord {
  key?: string,
};

//定義全局變量
const tableData: tableDataTemp[] = [];
//遍歷selectedRows對象構造tableData
const handleTableData = (selectedRows: InvestmentRecord[], flag: string) => {
  //賦值之前清空數據內容
  tableData.length = 0;
  if (flag == "update") {
    if (selectedRows.length > 0 && selectedRows != null) {
      selectedRows.forEach(row => {
        const temp: tableDataTemp = {
          key: row.seq,
          id: row.id,
          trasdate: row.trasdate,
          operator: row.operator,
          otype: row.otype,
          fundcode: row.fundcode,
          amount: row.amount,
          platform: row.platform,
          events: row.events,
        };
        tableData.push(temp);
      });
    }
  }
};

/**
 * -記錄錄入
 * @param fields 
 */
const handleAdd = async (fields: InvestmentRecord) => {
  const hide = message.loading('正在添加');
  try {
    await addRrecords({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
*  删除數據
* @param selectedRows
*/
const handleRemove = async (selectedRows: InvestmentRecord[]) => {
  const hide = message.loading('正在删除');
  const tempId: delIdList = {
    idList: selectedRows.map((row) => row.id),
  }
  if (!selectedRows) return true;
  try {
    await removeRecords(tempId);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
/**
 * - 批量處理數據
 * @param selectedRows 
 */
const handleDealData = async (fiedls: InvestmentRecord[]) => {
  const hide = message.loading('正在處理');
  if (!fiedls) return true;
  try {
    await multiDealData(fiedls);
    hide();
    message.success('處理成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('處理失败，请重试');
    return false;
  }
};

/**
 * -更新記錄
 * @param fields 
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateRecords({
      id: fields.id,
      fundcode: fields.fundcode,
      operator: fields.operator,
      trasdate: fields.trasdate,
      otype: fields.otype,
      amount: fields.amount,
      platform: fields.platform,
      events: fields.events,
    });
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};


const TableList: React.FC<{}> = () => {
  /**
   * InvestmentRecord顯示欄位屬性配置
   */
  const columns: ProColumns<InvestmentRecord>[] = [
    {
      title: '序號',
      hideInSearch: true,
      hideInForm: true,
      dataIndex: 'seq',
    },
    {
      title: '唯一識別碼',
      hideInSearch: true,
      hideInForm: true,
      dataIndex: 'id',
    },
    {
      title: '交易日期',
      dataIndex: 'trasdate',
      order: 1,
      hideInForm: false,//控制在表單創建時是否顯示
      hideInSearch: true,//控制在搜索條件時是否顯示
      hideInTable: false,//控制在表單查詢中是否顯示
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '起始日期',
      dataIndex: 'sdate',
      order: 1,
      hideInForm: true,
      hideInTable: true,
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '結束日期',
      dataIndex: 'edate',
      order: 1,
      hideInForm: true,
      hideInTable: true,
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '交易人',
      hideInForm: false,
      sorter: true,
      order: 3,
      dataIndex: 'operator',
    },
    {
      title: '交易類型',
      hideInForm: false,
      order: 4,
      dataIndex: 'otype',
      valueEnum: {
        1: { text: 'Buy in', status: 'Buy in' },
        0: { text: 'Sold out', status: 'Sold out' }
      }
    },
    {
      title: '代碼',
      hideInForm: false,
      sorter: true,
      order: 5,
      dataIndex: 'fundcode',
    },
    {
      title: '金額',
      hideInSearch: true,
      hideInForm: false,
      dataIndex: 'amount',
      renderText: (val: number) => `¥ ${val}`
    },
    {
      title: '平台',
      order: 2,
      hideInForm: false,
      dataIndex: 'platform',
    },
    {
      title: '重大事件',
      hideInSearch: true,
      hideInForm: false,
      valueType: 'textarea',
      dataIndex: 'events',
    },
    {
      title: '創建日期',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
      valueType: 'dateTime',
      dataIndex: 'createdate',
    },
    {
      title: '更新日期',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
      valueType: 'dateTime',
      dataIndex: 'updatedate',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}>
            修改
          </a>
        </>
      ),
    },
  ];
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [multiModalVisible, handleMultiModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();

  return (
    <PageHeaderWrapper subTitle="基礎數據的收集校驗查詢">
      <ProTable<InvestmentRecord>
        search={true}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增記錄
                </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key == 'remove') {
                      await handleRemove(selectedRows);//await是一個修飾，而不是一個函數
                      action.reload();
                    }
                    if (e.key == "add" || e.key == "update") {
                      handleMultiModalVisible(true);
                      handleTableData(selectedRows, e.key);//傳遞選中行數據
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="add">批量添加</Menu.Item>
                  <Menu.Item key="update">批量修改</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={(params, sorter, filter) => queryRecords({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />

      {/*使用handleModalVisible和createModalVisible變量來控制彈出框的顯示以及取消按鈕動作*/}

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<InvestmentRecord, InvestmentRecord>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }
          }
          columns={columns}
          type='form'
          rowKey='id'
          rowSelection={{}}
        />
      </CreateForm>

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisable={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <MultiFrom
        onCancel={() => handleMultiModalVisible(false)}
        updateModalVisable={multiModalVisible}
        tableData={tableData}
        onSubmit={async (value) => {
          const success = await handleDealData(value);
          if (success) {
            handleMultiModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }
        }
      >
      </MultiFrom>
    </PageHeaderWrapper>
  )
};

export default TableList;