import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table,message} from "antd";
import './index.less';

import {reqProduct} from '../../../api'
import MyButton from '../../../component/MyButton'
import {updateStatus} from '../../../api'



const {Option} = Select;

export default class Index extends Component {
    state = {
        productList: [],
        total:0,
        isLoading:true
    }
    addProduct=()=>{
        this.props.history.replace('/product/saveUpdate')
    }
    toggleStatus=(product)=>{
        return async ()=>{
            console.log('----------')
            console.log(product)
            const {_id,status}=product
            const result=await updateStatus({_id,status})
            if (result){
                message.success('更新状态成功',1)
                this.setState({
                    productList:this.state.productList.map((item)=>{
                        if(item._id===_id) {item.status=item.status===1?2:1}
                        return item
                        })
                    }
                )
            }
    }}
    modifyProduct=(product)=>{
    return()=>{

    }
    }


    /*请求页面页数和指定页数的数据，每次路由组价的切换时，另外一个组件会被卸载，
    初始化默认请求第一页数据，点击切换页面时加载其他页，所以要请求回来的数据包括总页数
    */
    reqProductList=async (pageNum,pageSize)=>{
        this.setState({
                isLoading:true
        })
        const productData = await reqProduct(pageNum,pageSize)
        if (productData) {
            const {list,total}=productData
            this.setState({
                productList: list,
                total:total,
                isLoading:false
            })
        }
    }
    async componentDidMount() {
        this.reqProductList(1,3)
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
            // dataIndex: 'status',
            render: (product) => {
                return product.status === 1
                    ? <div onClick={this.toggleStatus(product)}>
                        <Button type='primary'>上架</Button> 已下架
                    </div>
                    : <div onClick={this.toggleStatus(product)}>
                        <Button type='primary' >下架</Button> 在售
                    </div>

            }
        }, {
            title: '操作',
            render: (text) => {
                return <div>
                    <MyButton>详情</MyButton>
                    <MyButton onClick={this.modifyProduct(product)}>修改</MyButton>
                </div>
            }
        }]

        const {productList,total,isLoading} = this.state;
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
                    pagination={{
                        defaultPageSize:3,
                        showSizeChanger:true,
                        pageSizeOptions:['3','6','9','12'],
                        total,
                        onChange:this.reqProductList,
                        onShowSizeChange:this.reqProductList,
                        loading:isLoading
                    }}

                >
                </Table>

            </Card>
        )
    }
}

