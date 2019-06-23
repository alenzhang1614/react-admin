import React,{Component} from 'react';
import { Layout,  Breadcrumb,} from 'antd';
import LeftNav from '../../component/leftNav'
import HeaderMain from '../../component/headerMain'
const { Content, Footer,Header } = Layout;
export default class Main extends Component{
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

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