import { Modal, Button,Form,Input } from 'antd';
import React,{Component} from 'react';
const {Item}=Form



class CreatRole extends React.Component {

render() {
    const {getFieldDecorator}=this.props.form
        return (
            <Form hideRequiredMark={true} >
                <Item label='角色名称:' labelCol={{span:4}} wrapperCol={{span:20}}>
                    {
                        getFieldDecorator(
                            'name',
                            {
                                rules: [{ required: true, message: '请输入角色名称!' }],
                            }
                        )(
                            <Input />
                        )}

                </Item>
            </Form>
        )
    }
}
export default Form.create()(CreatRole)
