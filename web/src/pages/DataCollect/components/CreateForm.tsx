import React from 'react';
import {Modal} from 'antd';

//創建新建頁模型
interface CreateFormProps{
    modalVisible: boolean,
    onCancel: ()=>void,
}

const CreateFrom:React.FC<CreateFormProps>=(props)=>{
    const{modalVisible,onCancel}=props;

    return(
        <Modal
        destroyOnClose
        title="新建記錄"
        onCancel={()=>onCancel()}
        visible={modalVisible}
        footer={null}
        >
        {props.children}            
        </Modal>
    );
};

export default CreateFrom;
