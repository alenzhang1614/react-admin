import React, {Component} from 'react';
import {Card, Table, Button, Icon, message, Modal} from 'antd';
import MyButton from '../../component/MyButton';
import {reqCategory, addCategory,updateCategory,deleteCategory} from '../../api'
import AddCategoryForm from './addCategoryForm'
import UpdateCategoryName from './updateCategoryName'

const { confirm } = Modal

export default class Category extends Component {
    state = {
        category: [],
        isShowAddCategory: false,
        isShowUpdateCategory: false,
    }
    showCategory=(isShow)=>{
        return ()=>this.setState({
            [isShow]: true
        });
    }
    hiddenCategory=(isShow)=>{
        return ()=>{
            this.addCategoryNameForm.props.form.resetFields()
            this.setState({
                [isShow]:false
            })
        }
    }
    // 点击确认后添加分类列表到数据库,添加品类
    addCategory = () => {
        const {validateFields, resetFields} = this.addCategoryNameForm.props.form;
        /*校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        *参数：fildname，option，callback（err，values）
        * */
        validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const {parentId, categoryName} = values
            const result = await addCategory({parentId, categoryName})
            if (result) {
                message.success('添加品类成功', 1)
                if(result.parentId==='0'){
                    this.setState({
                        category: [...this.state.category, result]
                    })
                }
            }
            this.setState({isShowAddCategory: false});
            resetFields();
        })
    };
    //给品类修改名称
    updateCategoryName = (data) => {
        return ()=>{
            this.setState({
                isShowUpdateCategory:true
            })
            const {_id,name} = data
            this.updateData={
                categoryId:_id,
                categoryName: name
            }
        }

    }
    //保存修改的数据
    confirmUpdateCategory=()=>{
        const {validateFields, resetFields} = this.addCategoryNameForm.props.form;
        /*校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        *参数：fildname，option，callback（err，values）
        * */
        validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const {categoryName} = values
            const {categoryId}=this.updateData
            const result = await updateCategory({categoryId, categoryName})
            const {category}=this.state
            if (result) {
                message.success('更新品类成功', 1)
                this.setState({
                    category: category.map((item)=>{
                        const {parentId,_id,name}=item
                        if (_id===categoryId)
                            return {
                                parentId,
                                _id,
                                name:categoryName
                            }
                        else return {
                            parentId,
                            _id,
                            name
                        }
                    })
                })
            }
            this.setState({isShowUpdateCategory: false});
            resetFields();
        })
    }
//删除数据
    deleteCategory=(deleteData)=>{
        console.log(deleteData)
        return ()=>{
            confirm({
                title: '确定要删除当前品类及子品类吗删除后数据无法恢复?',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    const result=await deleteCategory(deleteData._id)
                    if (result){
                        message.success('删除数据成功', 1)
                        this.setState({
                            category:this.state.category.filter((item)=>item._id!=deleteData._id)
                        })
                    }
                },
            });
        }
    }
    addCategoryForm = formRef => {
        this.addCategoryNameForm = formRef;
    };
    //初始化列表数据
    async componentDidMount() {
        const result = await reqCategory(0)
        // const newResult=result.filter((item)=>item.isDel===false)
        this.setState({
            category: result
        })
    }
    render() {
        const columns = [
            {
                title: '商品列表',
                dataIndex: 'name',
            },
            {
                title: '添加列表',
                // dataIndex: 'operate',
                width: 300,
                render: text => {
                    //text 的值在没有设置dataIndex时，就是遍历的数据列表，传入参数是就是参数指向的内容
                    return (
                        <div>
                            <MyButton onClick={this.updateCategoryName(text)}>修改名称</MyButton>
                            <MyButton >查看子类</MyButton>
                            <MyButton onClick={this.deleteCategory(text)}>删除品类</MyButton>
                        </div>
                    )
                }
            },
        ]
        const {category,isShowAddCategory,isShowUpdateCategory} = this.state
        return (
            <div className='categoryWarp'>
                <Card title="商品列表"
                      extra={<Button type="primary" onClick={this.showCategory('isShowAddCategory')}><Icon type="plus"/>添加内容</Button>}>
                    <Modal
                        visible={isShowAddCategory}
                        title="添加分类"
                        okText="确认"
                        cancelText='取消'
                        onCancel={this.hiddenCategory('isShowAddCategory')}
                        onOk={this.addCategory}
                    >
                        <AddCategoryForm wrappedComponentRef={this.addCategoryForm} categoryData={category}
                    />
                    </Modal>
                    <Modal
                        visible={isShowUpdateCategory}
                        title="添加分类"
                        okText="确认"
                        cancelText='取消'
                        onCancel={this.hiddenCategory('isShowUpdateCategory')}
                        onOk={this.confirmUpdateCategory}
                    >
                        <UpdateCategoryName wrappedComponentRef={this.addCategoryForm} updateData={this.updateData}
                        />
                    </Modal>
                    <Table
                        columns={columns}
                        dataSource={category}
                        bordered
                        rowKey={'_id'}
                        pagination={{
                            showSizeChanger: true,
                            defaultPageSize: 3,
                            showQuickJumper: true,
                            pageSizeOptions: ['3', '6', '9', '12']
                        }
                        }
                    />,
                </Card>
            </div>
        )
    }
}

