import React,{Component} from 'react';
import { Layout} from 'antd';
import LeftNav from '../../component/leftNav'
import HeaderMain from '../../component/headerMain'
import {getItem} from "../../ulit/storage_tools";
import {resConfirmUser} from '../../api/index'

const { Content, Footer} = Layout;
export default class Main extends Component{
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    async componentWillMount() {
        const userData=getItem()
        if (userData&&userData._id){
            const result=await resConfirmUser(userData._id)
            console.log(result)
            if (result) return
            //判断一下这个数据在数据是否存在，定义了resConfirmUser函数，通过ajax请求到后台验证，防止伪造localstorage
        }
            //为了保证这个内容不是自己添加的，正常情况应该去后台验证
            this.props.history.replace('/Login')

    }
    render(){

        return(
            <Layout style={{ minHeight: '100vh' }}>
                <LeftNav/>
                <Layout>
                    <HeaderMain/>

                    <Content style={{ margin: '0 16px' }}>
                       {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center',color:'#ccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}