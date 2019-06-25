import React, {Component} from 'react';
import { Card ,Table,Button,Icon} from 'antd';
import MyButton from '../../component/MyButton';
import {reqCategory} from '../../api'



export default class Category extends Component {
    state={
        data:[],
    }
    async componentDidMount() {
        const result=await reqCategory(0)
        this.setState({
            data: result
        })

    }


    render() {
        const columns=[
            {
                title: '商品列表',
                dataIndex: 'name',
            },
            {
                title: '添加列表',
                dataIndex: 'operate',
                width:200,
                render: text => {
                    return(
                        <div>
                            <MyButton >修改名称</MyButton>
                            <MyButton >查看子类</MyButton>
                        </div>
                    )
                }
            },
        ]
        const {data}=this.state
        console.log(data)

        return (

                <div className='categoryWarp'>
                    <Card title="商品列表" extra={<Button  type="primary"><Icon type="plus" />添加内容</Button>} >
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            rowKey={'_id'}
                        />,
                    </Card>
                </div>

        )
    }
}

