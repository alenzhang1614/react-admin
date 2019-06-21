import React,{Component} from 'react';
import logo from './img/logo.png'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less'
export default class Login extends Component{
    render(){
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
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                    className='loginInput'
                                />
                        </Form.Item>
                        <Form.Item>

                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                    className='loginInput'
                                />

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