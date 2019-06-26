import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table} from "antd";
import './index.less';

import {reqProduct} from '../../../api'
import MyButton from '../../../component/MyButton'

const {Option} = Select;

export default class Index extends Component {
    state = {
        productList: []
    }
    addProduct=()=>{
        this.props.history.replace('/product/saveUpdate')
    }
    async componentDidMount() {
        const productData = await reqProduct(1, 3)
        if (productData) {
            this.setState({
                productList: productData.list
            })
        }

    }
    render() {
        const columns = [{
            title: '商品名称',
            dataIndex: 'name'
        }, {
            title: '商品描述',
            dataIndex: 'desc'
        }, {
            title: '价格',
            dataIndex: 'price'
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (status) => {
                return status === 1
                    ? <div>
                        <Button type='primary'>上架</Button> 已下架
                    </div>
                    : <div>
                        <Button type='primary'>下架</Button> 在售
                    </div>

                // if (status===1) return <div>
                //        <Button type='primary'>上架</Button> 已下架
                //     </div>
                // else return <div>
                //     <Button type='primary'>下架</Button> 在售
                // </div>
            }
        }, {
            title: '操作',
            render: (text) => {
                return <div>
                    <MyButton>详情</MyButton>
                    <MyButton>修改</MyButton>
                </div>
            }
        }]

        const {productList} = this.state;
        console.log(productList)

        return (
            <Card className='productWarp'
                  title={<div>
                      <Select defaultValue='0'>
                          <Option value="0">按照商品名称</Option>
                          <Option value="1">按照商品价格</Option>
                      </Select>
                      <Input type="text" placeholder="关键词" className='searchInput'/>
                      <Button type='primary'>搜索</Button>
                  </div>}
                  extra={
                      <Button type='primary' onClick={this.addProduct}><Icon type='plus'/>添加商品</Button>
                  }
            >
                <Table
                    columns={columns}
                    dataSource={productList}
                    rowKey={"_id"}
                    bordered
                >
                </Table>

            </Card>
        )
    }
}

