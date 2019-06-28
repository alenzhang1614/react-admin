import React, {Component} from 'react';
import {Card, Icon, Form, Input, Cascader, Button, InputNumber, message} from 'antd';
import './index.less';
import {reqCategory,updateProduct,addProduct} from '../../../api'
import RichTextEditor from './richTextEditor'
import {Link} from 'react-router-dom'

//将富文本编译器内容展示
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";




const {Item} = Form


class SaveUpdate extends Component {
    state = {
        options: [],
        total: 0
    };
    richTextEditorRef = React.createRef()

    loadData = (async (category) => {
        const subCategory = category[category.length - 1];
        console.log(subCategory)
        subCategory.loading = true;
        const parentId = subCategory.value
        // this.getCategory(parentId)

        const result = await reqCategory(parentId)
        if (result) {
            console.log(result)
            subCategory.loading = false;
            subCategory.children = result.map((item) => {
                return {
                    label: `${item.name}`,
                    value: `${item._id}`
                }
            })
            this.setState({
                options: [...this.state.options],
            });
        }
    });
//添加商品
    addProduct = (e) => {

        e.preventDefault()
        const {validateFields} = this.props.form
        validateFields(async (err, values) => {
            if (err) {
                return
            }
            const {editorState} = this.richTextEditorRef.current.state
            const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            const {name, desc, categoriesId, price} = values
            let pCategoryId = '';
            let categoryId = '';
            if (categoriesId.length === 1) {
                pCategoryId = '0';
                categoryId = categoriesId[0];
            } else {
                pCategoryId = categoriesId[0];
                categoryId = categoriesId[1];
            }
            const product=this.props.location.state
            let result=null
            let msg=''
            let options={categoryId, pCategoryId, name, price, desc, detail}
            if(product)  {
                 options._id=product._id
                result = await updateProduct(options)
                msg='修改产品成功'
                console.log(options)
            }
            else {
                result = await addProduct(options)
                msg='添加商品成功'
            }
            if (result) {
                message.success(msg, 1)
                this.props.history.push('/product/index')
            }

        })
    }


    getCategory = async (parentId) => {
        const result = await reqCategory(parentId)
        if (result) {
            if (parentId === '0') {
                this.setState({
                    options: result.map((item) => {
                        return {
                            value: item._id,
                            label: item.name,
                            isLeaf: false
                        }
                    })
                })
            } else {
                this.setState({
                    options: this.state.options.map((item) => {
                        //item不存在_id ,只存在item.value(里面存的时候当前的id)，查找他下面的所有的子类
                        if (item.value === parentId) {
                            item.children = result.map((childrenItem) => {
                                return {
                                    label: `${childrenItem.name}`,
                                    value: `${childrenItem._id}`
                                }
                            })
                        }
                        return item
                    })
                })
            }
            console.log(this.state.options)
        }

    }


//获取一级分类列表，点击时获取二级分类
    async componentDidMount() {
        //当添加产品时默认加载一级分类数据
        this.getCategory('0')
        //修改产品时查找一级分类数据和二级分类数据
        const product = this.props.location.state;
        let categoriesId = [];
        if (product) {
            const {categoryId, pCategoryId} = product;
            console.log(pCategoryId, categoryId)
            if (pCategoryId !== '0') {
                categoriesId.push(pCategoryId);
                //查找1级分类，和二级分类，查找1级分类对应下的二级分类，传pCategoryId
                this.getCategory(pCategoryId)
            }
            categoriesId.push(categoryId)
        }
        this.categoriesId = categoriesId
        console.log(this.categoriesId)


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
        const {getFieldDecorator} = this.props.form
        /*获取从网页传来的数据，如果product存在说明是，修改信息，不存在说明是添加产品*/
        const product = this.props.location.state;
        return (
            <Card
                title={
                    <div className='addProductTitle'>
                        <Link to='/product/index'>
                            <Icon type='arrow-left' className='arrowLeft'/>
                        </Link>
                        <span>{product ? '修改商品' : '添加商品'}</span>
                    </div>}>
                <Form {...formItemLayout} onSubmit={this.addProduct}>
                    <Item label='商品名称'>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品名称',
                                }
                            ],
                            initialValue: product ? product.name : ''
                        })(
                            <Input placeholder='请输入商品名称'/>
                        )}
                    </Item>
                    <Item label='商品描述'>
                        {getFieldDecorator('desc', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入商品描述',
                                    }
                                ],
                                initialValue: product ? product.desc : ''
                            }
                        )(
                            <Input placeholder='请输入商品描述'/>
                        )}
                    </Item>
                    <Item label='商品分类'>
                        {getFieldDecorator('categoriesId', {
                            rules: [
                                {
                                    required: true,
                                    message: '选择商品品类',
                                }
                            ],
                             initialValue: this.categoriesId
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


                    <Item label='商品价格'>
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品价格',
                                }
                            ],
                            initialValue: product ? product.price : ''
                        })(
                            <InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                className='priceInput'
                            />
                        )}
                    </Item>
                    <Item label='商品详情' wrapperCol={{span: 20}}>
                        {getFieldDecorator('detail', {
                            rules: []
                        })(
                            <RichTextEditor ref={this.richTextEditorRef} detail={product ? product.detail : ''}/>
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

export default Form.create()(SaveUpdate)

