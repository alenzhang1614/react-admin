import React,{Component} from 'react';
import { Card,  Icon,  List } from "antd";
import {Link} from "react-router-dom";

// import RichTextEditor from "../saveUpdate";


export default class Detail extends Component{
    render(){
        const {product,pName,cName} = this.props.location.state
        let category=null
        if (pName) {
            category = <span>商品分类: {pName}<Icon type='arrow-right'/>{cName}<Icon type='arrow-right'/>{product.name}</span>;
        } else {
            category = <span>商品分类: {cName}<Icon type='arrow-right'/>{product.name}</span>;
        }


        const data = [
            '商品名称:'+product.name,
            '商品描述:'+product.desc,
            '商品价格:'+product.price +'元',
            category,
            '商品图片:'+product.imgs,
            '商品详情:'+product.detail

        ];
        return(
            <Card
                title={
                    <div className='addProductTitle'>
                        <Link to='/product/index'>
                            <Icon type='arrow-left' className='arrowLeft'/>
                        </Link>
                        <span>商品详情</span>
                    </div>}>
                <List
                    bordered
                    size='large'
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}