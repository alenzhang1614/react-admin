import React,{Component} from 'react';
import {Form,Input,Select,} from "antd";
import PropTypes from 'prop-types';
const {Item}=Form
const {Option} = Select


export default class AddUser extends Component{
    static propTypes={
        roles:PropTypes.array.isRequired
    }
    render(){
        return(
            <Form>
                <Item label='用户名'>
                    <Input/>
                </Item>
                <Item label='密码'>
                    <Input/>
                </Item>
                <Item label='确认密码'>
                    <Input/>
                </Item>
                <Item label='电话号码'>
                    <Input/>
                </Item>
                <Item label='邮箱'>
                    <Input/>
                </Item>
                <Item label='角色'>
                    <Option></Option>
                </Item>


            </Form>
        )
    }
}