import React,{Component} from 'react';
import logo from './img/logo.png'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
export default class Login extends Component{
    render(){
        return(
            <div>
                <header>
                    <h1>
                        <img src={logo} alt=""/>
                    </h1>
                    <div>
                        React项目: 后台管理系统
                    </div>
                </header>
                <div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                        </Form.Item>
                        <Form.Item>

                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,

                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}