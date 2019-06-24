import React, {Component} from 'react';
import {Layout,Modal} from 'antd';
import './index.less'
import logo from '../../assets/img/logo.png'
import {getItem,removeItem} from  '../../ulit/storage_tools'
import MyButton from '../MyButton'
import {withRouter} from 'react-router-dom'

const { confirm } = Modal;

const {Header} = Layout;
 class HeaderMain extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };
    escLogin=()=>{
        console.log('escLogin()')
            confirm({
                title: '你确定要退出当前用户吗?',
                okText: '确定',
                cancelText: '取消',
                onOk:()=> {
                    removeItem()
                    this.props.history.replace('/login')
                },
            });
    }
    componentWillMount() {
        this.username=getItem('USER_KEY').username
    }
    render() {
        return (
            <Header style={{background: '#fff', padding: 0}} className='header'>
                <div className='headerMainTop'>
                    <span>欢迎 {this.username}</span>
                    <MyButton onClick={this.escLogin}>退出</MyButton>
                    {/*通过props将函数传给button*/}
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
export default withRouter(HeaderMain)