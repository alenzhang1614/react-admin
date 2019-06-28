import { Modal, Button,Form,Input } from 'antd';
import React,{Component,Fragment} from 'react';
const {Item}=Form



 class SetRole extends React.Component {

render() {
    const {getFieldDecorator}=this.props.form
        return (
           <Fragment>
               <Form>
                   <Item label='角色名称'>
                       {
                           getFieldDecorator(
                               'name',
                       {
                           initialValue:this.props.name
                       }
                           )(
                               <Input disabled/>
                           )
                       }
                   </Item>
               </Form>

           </Fragment>
        )
    }
}
export default Form.create()(SetRole)
