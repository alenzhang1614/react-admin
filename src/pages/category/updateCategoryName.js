import React, {Component} from 'react';
import { Form, Input} from 'antd';
import PropTypes from 'prop-types'

class UpdateCategoryName extends Component {
    static propTypes={
        updateData:PropTypes.object.isRequired
    }

    validator = (rules, value, callback) => {//自定义校验规则
        // console.log(value)
        if (!value) return callback('名称不能为空')
        const {categoryName}=this.props.updateData
        if (value===categoryName) return callback('请输入不同的名字');
        else callback();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {categoryName}=this.props.updateData
        const {Item} = Form
        return (
                <Form layout="vertical">
                    <Item label="修改名称">
                        {getFieldDecorator('categoryName', {
                            initialValue:categoryName,
                            rules: [{validator: this.validator}],
                        })(<Input type="textarea" placeholder='请输入要修改的名称'/>)}
                    </Item>
                </Form>

        );
    }
}

export default Form.create()(UpdateCategoryName)