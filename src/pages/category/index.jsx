import React, {Component} from 'react';
import { Card ,Table,Button,Icon,message} from 'antd';
import MyButton from '../../component/MyButton';
import {reqCategory,addCategory} from '../../api'
import AddCategoryForm from './addCategoryForm'
export default class Category extends Component {
    state={
        category:[],
        visible: false,
    }
    showAddCategory = () => {
        this.setState({ visible: true });
    };

    cancelCategory = () => {
        this.setState({ visible: false });
    };
// 点击确认后添加分类列表到数据库,//添加品类
    addCategory = () => {
        const {validateFields,resetFields}=this.addCategoryNameForm.props.form;
/*校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
*参数：fildname，option，callback（err，values）
* */
        validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const {parentId,categoryName}=values
            const result=await addCategory({parentId,categoryName})
            console.log(result)
            if(result){
                message.success('添加品类成功',1)
                this.setState({
                    category:[...this.state.category,result]
                })
            }
            this.setState({ visible: false });
            resetFields();
        })
    };
    //给品类修改名称
    updateCategoryName=()=>{}
    addCategoryForm = formRef => {
        this.addCategoryNameForm = formRef;
    };

    async componentDidMount() {
        const result=await reqCategory(0)
        this.setState({
            category: result
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
                width:300,
                render: text => {
                    return(
                        <div>
                            <MyButton onClick={this.updateCategoryName}>修改名称</MyButton>
                            <MyButton >查看子类</MyButton>
                            <MyButton>删除品类</MyButton>
                        </div>
                    )
                }
            },
        ]
        const {category}=this.state
        return (
                <div className='categoryWarp'>
                    <Card title="商品列表" extra={<Button  type="primary" onClick={this.showAddCategory}><Icon type="plus" />添加内容</Button>} >
                        <AddCategoryForm
                            wrappedComponentRef={this.addCategoryForm}
                            visible={this.state.visible}
                            // 是否显示
                            onCancel={this.cancelCategory}
                            // 是否取消
                            onCreate={this.addCategory}
                            categoryData={category}
                        />
                        <Table
                            columns={columns}
                            dataSource={category}
                            bordered
                            rowKey={'_id'}
                            pagination={{
                                showSizeChanger:true,
                                defaultPageSize:3,
                                showQuickJumper:true,
                                pageSizeOptions:['3','6','9','12']
                            }
                            }
                        />,
                    </Card>
                </div>
        )
    }
}

