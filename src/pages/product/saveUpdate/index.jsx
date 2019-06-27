import React, {Component} from 'react';
import {Card, Icon, Form, Input, Cascader, Button, InputNumber,message} from 'antd';
import './index.less';
import {reqCategory} from '../../../api'
import RichTextEditor from './richTextEditor'
import {Link} from 'react-router-dom'
//将富文本编译器内容展示
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

import {addProduct} from '../../../api'




const {Item} = Form


class SaveUpdate extends Component {
    state = {
        options: [],
        total:0
    };
    richTextEditorRef=React.createRef()

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
//添加商品
    addProduct=(e)=>{
        e.preventDefault()
        const {validateFields}=this.props.form
        validateFields(async (err,values)=>{
            if (err){
                return
            }
            console.log(values)
            const {editorState}=this.richTextEditorRef.current.state
            const detail=draftToHtml(convertToRaw(editorState.getCurrentContent()))
            const {name,desc,categoriesId,price}=values
            let pCategoryId='';
            let categoryId='';
            if (categoriesId.length===1){
                pCategoryId='0';
                categoryId=categoriesId[0];
            }else{
                pCategoryId=categoriesId[0];
                categoryId=categoriesId[1];
            }
            const result= await addProduct({categoryId,pCategoryId,name,price,desc,detail})
            if (result) {
                message.success('添加商品成功',1)
                console.log(result)
                this.props.history.push('/product/index')
            }


        })
    }



//获取一级分类列表，点击时获取二级分类
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
        const {getFieldDecorator}=this.props.form
        return (
            <Card
                title={
                    <div className='addProductTitle'>
                        <Link to='/product/index'>
                            <Icon type='arrow-left' className='arrowLeft'/>
                        </Link>
                        <span>添加商品</span>
                    </div>}>
                <Form {...formItemLayout} onSubmit={this.addProduct}>
                    <Item label='商品名称'>
                        {getFieldDecorator('name',{
                            rules:[
                                {
                                    required: true,
                                    message: '请输入商品名称',
                                }
                            ]
                        })(
                            <Input placeholder='请输入商品名称'/>
                        )}
                    </Item>
                    <Item label='商品描述'>
                        {getFieldDecorator('desc',{
                                rules:[
                                    {
                                        required: true,
                                        message: '请输入商品描述',
                                    }
                                ]
                            }

                        )(
                            <Input placeholder='请输入商品描述'/>
                        )}
                    </Item>
                    <Item label='商品分类'>
                        {getFieldDecorator('categoriesId',{
                            rules:[
                                {
                                    required: true,
                                    message: '选择商品品类',
                                }
                            ]
                        })(
                            <Cascader
                                placeholder='请选择商品分类'
                                options={this.state.options}
                                loadData={this.loadData}
                                onChange={this.onChange}
                                changeOnSelect
                                style={{width: '50%'}}
                            />
                        )}
                    </Item>


                    <Item label='商品价格' >
                        {getFieldDecorator('price',{
                            rules:[
                                {
                                    required: true,
                                    message: '请输入商品价格',
                                }
                            ]
                        })(
                            <InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                className='priceInput'
                            />
                        )}
                    </Item>
                    <Item label='商品详情'  wrapperCol={{span: 20}} >
                        {getFieldDecorator('detail',{
                            rules:[]
                        })(
                            <RichTextEditor ref={this.richTextEditorRef}/>
                        )}

                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Item>
                </Form>

            </Card>
        )
    }
}

export default  Form.create()(SaveUpdate)

