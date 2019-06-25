import React,{Component} from 'react';
import { Layout} from 'antd';
import LeftNav from '../../component/leftNav'
import HeaderMain from '../../component/headerMain'
import {getItem} from "../../ulit/storage_tools";
import {resConfirmUser} from '../../api/index'
import {Route,Switch,Redirect} from 'react-router-dom'

import Home from '../../pages/home'
import Category from '../../pages/category'
import Pie from '../../pages/pie'
import Product from '../../pages/product'
import User from '../../pages/user'
import Rule from '../../pages/rule'
import Line from '../../pages/line'
import Bar from '../../pages/bar'


const { Content, Footer} = Layout;
export default class Main extends Component{
    state = {
        collapsed: false,
        isLoading:true,
        success:false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    async componentWillMount() {
        const userData=getItem()
        if (userData&&userData._id){
            //为了保证这个内容不是自己添加的，正常情况应该去后台验证
            //判断一下这个数据在数据是否存在，定义了resConfirmUser函数，通过ajax请求到后台验证，防止伪造localstorage
            const result=await resConfirmUser(userData._id)
            console.log(result)
            if (result) this.setState({
                isLoading:false,
                success:true
            })
        }else{
            this.setState({
                isLoading:false,
                success:false
            })
        }
        //加入直接在这里荣国this.props.location.replace(/login)来实现加入localstorage用户名存在并且正确就直接跳转到home组件，如果localstorage不存在或者错误，就跳转到login，因为后面有render。而且在生命周期函数中，即使已经跳转也要讲，所有的生命周期函数执行完，也就是还会render，所以就会出错，因为后面读取了localstorage的内容，空的时候会报错。跳转也会出错，先跳转login，在跳转home。
        //通过状态来实现如果用户名不存在，loading，suceess为false，如果存在，发送请求，判断用户名是否存在，存在返回值，状态为success改成true，isloading 为false。在等到判断中isloading为true，suceess为false
        //更新状态


    }
    render(){
        const {isLoading,success}=this.state
        console.log(isLoading,success)
        if (isLoading) return null
        else return success?<Layout style={{ minHeight: '100vh' }}>
            <LeftNav/>
            <Layout>
                <HeaderMain/>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Rule}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',color:'#ccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>: <Redirect to='/login'/>;
    }
}