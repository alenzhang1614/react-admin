import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
import logo from '../../assets/img/logo.png'
import './index.less'
import {Link} from 'react-router-dom'

const {Sider} = Layout;
const {SubMenu,Item} = Menu;
export default class LeftNav extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };
    creatMenu=(item)=>{
        return (
            <Item key={item.key}>
                <Link to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Link>

            </Item>)
    }
    componentWillMount() {//初始化渲染左侧导航栏
        this.menu = menuList.map((menu) => {
            const {children} = menu
            if (children) {
                return (<SubMenu
                    key={menu.key}
                    title={
                        <span>
                            <Icon type={menu.icon}/>
                             <span>{menu.title}</span>
                        </span>
                    }>
                    {children.map((item) => {
                       return this.creatMenu(item)
                    })}
                </SubMenu>)
            } else {
                return this.creatMenu(menu)
            }
        })
    }

    render() {
        const {collapsed} = this.state
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo">
                    <h1 className= "leftLogo">
                        <img src={logo} alt="logo"/>
                        <span style={{display:collapsed?'none':'block'}}>硅谷后台</span>
                    </h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {this.menu}
                </Menu>
            </Sider>
        )
    }
}