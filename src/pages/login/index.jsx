import React, {Component} from 'react';
import logo from '../../assets/img/logo.png'
import {Form, Icon, Input, Button} from 'antd';
import {resLogin} from '../../api'

import './index.less'

class Login extends Component {
    validator = (rule, value, callback) => {
        const name = rule.fullField === 'username' ? '用户名' : '密码'
        if (!value) {
            callback(`${name}不能为空`)
        } else if (value.length < 4) {
            callback(`${name}长度必须大于4`)
        } else if (value.length > 15) {
            callback(`${name}长度必须小于15`)
        } else if (!/^[a-zA-Z0-9_$]+$/.test(value)) {
            callback(`${name}只能是数字字母下划线和$`)
        } else {
            callback()
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {validateFields} = this.props.form;
        validateFields(async (error, values) => {
            if (!error) {
                const {username, password} = values
                /* axios.post('/login',{username, password})//服务器代理模式，服务器端口5000，自己及端口3000，产生跨域问题，可以采用proxy服务器代理模式。在配置文件中添加proxy：“http://localhost：5000，这里写成“http://localhost：3000，为了避免以后上线时出现端口变化导致的改代码的问题，就要写成”/login
                     .then((res)=>{//跳转至指定网址两种方式，1中red为redirect。2编程是导航this.history。repalce
                          const {data} = res
                          if(data.status===0){
                                  this.props.history.replace('/')
                          }
                         if(data.status===1){
                              message.error(data.msg,2)
                          }
                     })
                     .catch(res=>{
                          message.error("网络崩溃了~~~刷新试试")
                     })*/
                // const result=await ajax('/login',{username,password},'post')
                const result = await resLogin({username, password})//因为在login组件中路径和请求方式不会变，进一步优化，创建了reLogin函数，从而只需要传参传用户名和密码即可

                if (result) {
                    this.props.history.replace('/')
                } else {
                    this.props.form.resetFields('password')
                }
            } else {
                console.log('登录表单校验失败：', error);
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
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
                                    validator: this.validator
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                    className='loginInput'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{validator: this.validator}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
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