import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Steps } from 'antd';

import { InvestmentRecord } from '../data.d';

//定義表單值模型
export interface FormValueType extends Partial<InvestmentRecord> {
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisable: boolean;
  values: Partial<InvestmentRecord>;
}

//定義步驟表單變量
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

//實現分步表單主體
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  //更新時將值從主頁帶過來
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    fundcode: props.values.fundcode,
    platform: props.values.platform,
    otype: props.values.otype,
    operator: props.values.operator,
    events: props.values.events,
    amount: props.values.amount,
  });

  //步驟變量定義
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisable,
    values,
  } = props;

  //下一步
  const forward = () => setCurrentStep(currentStep + 1);
  //上一步
  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fidldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fidldsValue });
    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fidldsValue });
    }
  };

  const renderContent = () => {
    //第二個步驟展示頁
    if (currentStep == 1) {
      return (
        <>
          <FormItem
            name="trasdate"
            label="交易時間"
            rules={[{ required: true, message: '請選擇交易時間' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="請選擇交易時間"
            />
          </FormItem>

          <FormItem
            name="otype"
            label="操作類型"
          >
            <RadioGroup>
              <Radio value="1">Buy in</Radio>
              <Radio value="0">Sold out</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }
    //第三個步驟展示頁
    if (currentStep == 2) {
      return (
        <>
          <FormItem
            name="platform"
            label="平台"
            rules={[{ required: true, message: '請輸入交易平台' }]}
          >
            <input placeholder="請輸入交易平台"></input>
          </FormItem>

          <FormItem
            name="operator"
            label="操作人"
            rules={[{ required: true, message: '請輸入操作人姓名' }]}
          >
            <input placeholder="請輸入操作人姓名"></input>
          </FormItem>

          <FormItem
            name="amount"
            label="金額"
            rules={[{ required: true, message: '請輸入交易金額' }]}
          >
            <input placeholder="請輸入交易金額"></input>
          </FormItem>
        </>
      );
    }
    //默認第一步驟展示頁
    return (
      <>
        <FormItem
          name="id"
          label="記錄唯一碼"
          rules={[{ required: true, message: '系統自動生成唯一識別碼不可修改' }]}
        >
          <Input placeholder="不可手動修改唯一識別碼" readOnly={true} />
        </FormItem>
        <FormItem
          name="fundcode"
          label="代碼"
          rules={[{ required: true, message: '請輸入代碼' }]}
        >
          <input placeholder="請輸入" />
        </FormItem>

        <FormItem
          name="events"
          label="事件"
          rules={[{ required: true, message: '請輸入當天發生的重大事件', min: 4 }]}
        >
          <TextArea rows={4} placeholder="至少4個字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep == 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
        </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>
            取消
        </Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
        </Button>
        </>
      );
    }
    if (currentStep == 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
        </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>
            取消
        </Button>
          <Button type="primary" onClick={() => handleNext()}>
            提交
        </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
      </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="記錄配置"
      visible={updateModalVisable}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="重大事件記錄" />
        <Step title="基本信息設置" />
        <Step title="操作信息設置" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          operator: formVals.operator,
          fundcode: formVals.fundcode,
          amount: formVals.amount,
          otype: formVals.otype,          
          platform: formVals.platform,
          events: formVals.events,
        }}
      >
        {renderContent}
      </Form>
    </Modal>
  );

};

export default UpdateForm;