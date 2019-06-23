import React,{Component} from 'react';
import { Layout} from 'antd';
const { Header } = Layout;


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
            <Header style={{ background: '#fff', padding: 0 }} />
        )
    }
}