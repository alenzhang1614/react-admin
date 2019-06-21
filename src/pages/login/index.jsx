import React,{Component} from 'react';
import logo from './img/logo.png'
import { Form, Icon, Input, Button} from 'antd';
import './index.less'
class Login extends Component{
    validator=(rule, value, callback)=>{
        const name=rule.fullField==='username'?'用户名':'密码'
        if(!value){
            callback(`${name}不能为空`)
        } else if(value.length<4){
            callback(`${name}长度必须大于4`)
        }else if(value.length>15){
            callback(`${name}长度必须小于15`)
        }else if(!/^[a-zA-Z0-9_$]+$/.test(value)){
            callback(`${name}只能是数字字母下划线和$`)
        }else {
            callback()
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const  { validateFields } = this.props.form;
        validateFields((error, values)=>{
            if (!error){
                const {username,password}=values
                console.log(username,password)
            }else {
                console.log('登录表单校验失败：', error);
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='loginWarp'>
                <header className='loginHeader'>
                    <h1>
                        <img src={logo} alt=""/>
                        <span> React项目: 后台管理系统</span>
                    </h1>

                </header>
                <div className='login'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{
                                    // required: true, message: 'Please input your username!'
                                    validator:this.validator
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                    className='loginInput'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{  validator:this.validator}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                    className='loginInput'
                                />
                            )}

                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" className="loginBtn">
                                登录
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create()(Login);