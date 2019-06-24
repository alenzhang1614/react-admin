import React, {Component} from 'react';
import { Card ,Table,Button,Icon} from 'antd';
import MyButton from '../../component/MyButton'



export default class Category extends Component {
    state={
        columns:[
            {
                title: '商品列表',
                dataIndex: 'category',
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
        ],
        data:[
            {
                key: '1',
                category: 'John Brown',
                operate: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                category: 'Jim Green',
                operate: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                category: 'Joe Black',
                operate: 'Sidney No. 1 Lake Park',
            },
        ],
    }



    render() {
        const {columns,data}=this.state

        return (

                <div className='categoryWarp'>
                    <Card title="商品列表" extra={<Button  type="primary"><Icon type="plus" />添加内容</Button>} >
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                        />,
                    </Card>
                </div>

        )
    }
}

