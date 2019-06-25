import React, {Component} from 'react';
import {Form, Input, Select} from 'antd';
import Proptypes from 'prop-types'

const {Option} = Select;

class AddCategoryForm extends Component {
    static propTypes = {
        categoryData: Proptypes.array.isRequired
    }

    validator = (rules, value, callback) => {//自定义校验规则
        // console.log(value)
        if (!value) return callback('请输入分类名称，值不能为空');
        const result = this.props.categoryData.find((item) => value === item.name)
        if (result) return callback('分类已存在请重新输入');
        else callback();
    }

    render() {
        const {form, categoryData} = this.props;
        const {getFieldDecorator} = form;
        const {Item} = Form
        return (
            <Form layout="vertical">
                <Item label="所属分类">
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0',
                        })(
                            <Select
                                style={{width: '100%'}}
                            >
                                <Option value="0" key="0">一级分类</Option>
                                {
                                    // categoryData.filter((item) => item.parentId === 0).map((item)=>{
                                    //     return  <Option value ={item._id} key={item._id}>{item.name}</Option>
                                    // })
                                    //对一级分类列进行过滤
                                    categoryData.map((item) => {
                                        return <Option value={item._id} key={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>)
                    }
                </Item>
                <Item label="分类名称">
                    {getFieldDecorator('categoryName', {

                        rules: [{validator: this.validator}],
                    })(<Input type="textarea" placeholder='请输入分类名称'/>)}
                </Item>
            </Form>
        );
    }
}

export default Form.create()(AddCategoryForm)