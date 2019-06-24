import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
import logo from '../../assets/img/logo.png'
import './index.less'
import {Link, withRouter} from 'react-router-dom'

const {Sider} = Layout;
const {SubMenu, Item} = Menu;

class LeftNav extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };
    creatMenu = (item) => {
        return (
            <Item key={item.key}>
                <Link to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Link>
            </Item>)
    };

    componentWillMount() {//初始化渲染左侧导航栏
        const {pathname} = this.props.location;
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
                        if (item.key === pathname) {
                            // 说明当前地址是一个二级菜单，需要展开一级菜单
                            // 初始化展开的菜单
                            this.openKey = menu.key;
                        }
                        return this.creatMenu(item)
                    })}
                </SubMenu>)
            } else {
                return this.creatMenu(menu)
            }
        })
         this.selectedKey = pathname
    }


    componentWillReceiveProps(nextProps, nextContext) {
        const {pathname} = nextProps.location;
        this.selectedKey = pathname
    }

    render() {
        const {collapsed} = this.state
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo">
                    <h1 className="leftLogo">
                        <img src={logo} alt="logo"/>
                        <span style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</span>
                    </h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]}
                      mode="inline">
                    {this.menu}
                </Menu>

            </Sider>
        )
    }
}

export default withRouter(LeftNav)