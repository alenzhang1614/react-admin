import React, {Component} from 'react';
import {Layout, Modal} from 'antd';
import './index.less'
import {getItem, removeItem} from '../../ulit/storage_tools'
import MyButton from '../MyButton'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'

const {confirm} = Modal;

const {Header} = Layout;

class HeaderMain extends Component {
    state = {
        collapsed: false,
        systime: Date.now(),
        weather: {
            weather: '晴',
            imgUrl: 'http://api.map.baidu.com/images/weather/day/qing.png'
        },
        title:'首页'

    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };
    escLogin = () => {
        console.log('escLogin()')
        confirm({
            title: '你确定要退出当前用户吗?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                removeItem()
                this.props.history.replace('/login')
            },
        });
    }
    componentWillMount() {
        this.username = getItem().username
    }

    async componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({
                systime: Date.now()
            })
        }, 1000)
        const weather = await reqWeather('深圳')//异步函数为了得到结果async,切换组件需要停止发送请求
        this.setState({
            weather
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const pathName=nextProps.location.pathname
        const title=this.getTitle(pathName)
        this.setState({
            title
        })
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    getTitle=(pathName)=>{
        let title = ''
        for (let i=0;i<menuList.length;i++){
            const menu=menuList[i]
            if(menu.key===pathName){
                return title=menu.title
            } else if (menu.children){
                const children=menu.children
                for (let j=0;j<children.length;j++){
                    if(children[j].key===pathName){
                        return title=children[j].title
                    }
                }
           }
        }
        console.log(title)
        return title
    }

    render() {

        const {systime, weather: {weather, imgUrl}} = this.state
        return (
            <Header style={{background: '#fff', padding: 0}} className='header'>
                <div className='headerMainTop'>
                    <span>欢迎 {this.username}</span>
                    <MyButton onClick={this.escLogin}>退出</MyButton>
                    {/*通过props将函数传给button*/}
                </div>
                <div className='headerMainBottom clearfix'>
                    <div className="headerMainBottomLeft">
                        <h2>{this.state.title}</h2>
                    </div>
                    <div className="headerMainBottomRight">
                        <span>{dayjs(systime).format('YYYY - MM - DD HH:mm:ss')}</span>
                        <img src={imgUrl} alt=""/>
                        <span>{weather}</span>
                    </div>

                </div>
            </Header>
        )
    }
}

export default withRouter(HeaderMain)