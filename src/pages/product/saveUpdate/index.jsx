import React, {Component} from 'react';
import {Card, Icon, Form, Input, Cascader, Button, InputNumber} from 'antd';
import './index.less';
import {reqCategory} from '../../../api'
import RichTextEditor from './richTextEditor'




const {Item} = Form


export default class SaveUpdate extends Component {
    state = {
        options: [],

    };

    loadData = (async (category) => {
        console.log('category='+category)
        console.log(category)
        const subCategory = category[category.length - 1];
        console.log(subCategory)
        subCategory.loading = true;
        const parentId=subCategory.value
        const result = await reqCategory(parentId)
        // load options lazily
        if(result){
            console.log(result)
            subCategory.loading = false;
            subCategory.children= result.map((item)=>{
                return {
                    label:`${item.name}`,
                    value:`${item._id}`
                }
            })
            this.setState({
                options: [...this.state.options],
            });
        }
    });

    async componentDidMount() {
        //加载一级分类数据
        const result = await reqCategory("0")
        console.log(result)
        if (result) {
            this.setState({
                options: result.map((item)=>{
                    return {value:item._id,label:item.name,isLeaf: false}
                })
            })

        }
    }



    render() {

        const { editorState } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 2},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };

        return (
            <Card
                title={
                    <div className='addProductTitle'>
                        <Icon type='arrow-left' className='arrowLeft'/>
                        添加商品
                    </div>}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        <Input placeholder='请输入商品名称'/>
                    </Item>
                    <Item label='商品描述'>
                        <Input placeholder='请输入商品描述'/>
                    </Item>
                    <Item label='商品分类'>
                        <Cascader
                            placeholder='请选择商品分类'
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            changeOnSelect
                            style={{width: '50%'}}
                        />
                    </Item>
                    <Item label='商品价格'>
                        <InputNumber
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                        />
                    </Item>
                    <Item label='商品详情'  wrapperCol={{span: 22}} >
                        <RichTextEditor/>
                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Item>

                </Form>

            </Card>
        )
    }
}

