import React, {Component} from 'react';
import {Layout} from 'antd';
import './index.less'
import logo from '../../assets/img/logo.png'

const {Header} = Layout;


export default class Main extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}} className='header'>
                <div className='headerMainTop'>
                    <span>欢迎 Admin</span>
                    <button>登录</button>
                </div>
                <div className='headerMainBottom clearfix'>
                    <div className="headerMainBottomLeft">
                        <h2>首页</h2>
                    </div>
                    <div className="headerMainBottomRight">
                        <span>{Date.now()}</span>
                        <img src={logo} alt=""/>
                        <span>晴</span>
                    </div>

                </div>
            </Header>
        )
    }
}