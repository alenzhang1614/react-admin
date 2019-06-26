import React, {Component} from 'react';
import {Card, Table, Button, Icon, message, Modal} from 'antd';
import MyButton from '../../component/MyButton';
import {reqCategory, addCategory, updateCategory, deleteCategory} from '../../api'
import AddCategoryForm from './addCategoryForm'
import UpdateCategoryName from './updateCategoryName'

const {confirm} = Modal

export default class Category extends Component {
    state = {
        category: [],
        subCategory: [],
        isShowAddCategory: false,
        isShowUpdateCategory: false,
        isShowSubCategory: false,
        isLoading:true//表单数据加载中
    }

    openLoading=()=>{
        this.setState({
            isLoading:true
        })
    }
    closeLoading=()=>{
        this.setState({
            isLoading:false
        })
    }

    //请求分类数据，一级分类和二级分类用了同一个请求，合并成一个
    reqCategroyDate = async (parentId) => {
        this.openLoading()
        const result = await reqCategory(parentId)
        if (result) {
            this.closeLoading()
            if (parentId === '0') {
                message.success('请求一级分类数据成功', 1)
                this.setState({
                    category: result,
                    isLoading:false
                })
            } else {
                message.success(`请求${this.currentPageMsg.parentName}分类数据成功`, 1)
                this.setState({
                    subCategory: result,
                    isShowSubCategory: true,

                })
            }
        }
    }
    showCategory = (isShow) => {
        return () => this.setState({
            [isShow]: true
        });
    }
    hiddenCategory = (isShow) => {
        return () => {
            this.addCategoryNameForm.props.form.resetFields()
            this.setState({
                [isShow]: false
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
            const {isShowSubCategory} = this.state
            this.openLoading()
            const result = await addCategory({parentId, categoryName})
            if (result) {
                this.closeLoading()
                message.success('添加品类成功', 1)
                if (isShowSubCategory && this.currentPageMsg.parentId === parentId) {
                    this.setState({
                        subCategory: [...this.state.subCategory, result]
                    })
                }

                if (result.parentId === '0') {
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
        return () => {
            this.setState({
                isShowUpdateCategory: true
            })
            const {_id, name} = data
            this.updateData = {
                categoryId: _id,
                categoryName: name
            }
        }

    }
    //保存修改的数据
    confirmUpdateCategory = () => {
        const {validateFields, resetFields} = this.addCategoryNameForm.props.form;
        /*校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        *参数：fildname，option，callback（err，values）
        * */
        validateFields(async (err, values, callback) => {
            if (err) {
                return;
            }
            const {categoryName} = values
            const {categoryId} = this.updateData
            const {category} = this.state
            const isSame = category.find((item) => item.name === categoryName)
            if (isSame) {return callback("该分类已存在")}
            this.openLoading()
            const result = await updateCategory({categoryId, categoryName})
            if (result) {
                this.closeLoading()
                message.success('更新品类成功', 1)
                this.setState({
                    category: category.map((item) => {
                        const {parentId, _id, name} = item
                        if (_id === categoryId)
                            return {
                                parentId,
                                _id,
                                name: categoryName
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
    deleteCategory = (deleteData) => {
        return () => {
            confirm({
                title: '确定要删除当前品类及子品类吗删除后数据无法恢复?',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    this.openLoading()
                    const result = await deleteCategory(deleteData._id)
                    if (result) {
                        this.closeLoading()
                        message.success('删除数据成功', 1)
                        if (deleteData.parentId === '0') {
                            this.setState({
                                category: this.state.category.filter((item) => item._id !== deleteData._id),
                                subCategory: this.state.subCategory.filter((item) => item.parentId !== deleteData._id)
                            })
                            // console.log(this.state.subCategory)
                        } else {
                            this.setState({
                                subCategory: this.state.subCategory.filter((item) => item._id !== deleteData._id)
                            })
                        }
                    }
                },
            });
        }
    }
    //展示二级分类数据
    showSubCategory = ((data) => {
        return async () => {
            //获取当前所在页面的父集ID
            this.currentPageMsg = {
                parentName: data.name,
                parentId: data._id
            }
            const {_id} = data
            this.reqCategroyDate(_id)
            // const subCategory=await reqCategory(_id)
            // this.setState({
            //     subCategory,
            //     isShowSubCategory:true
            // })
        }
    })
    hiddenSubCategory = () => {
        this.setState({
            isShowSubCategory: false
        })
        console.log(this.state.isShowSubCategory)
    }
    addCategoryForm = formRef => {
        this.addCategoryNameForm = formRef;
    };

    //初始化列表数据
    async componentDidMount() {
        // const result = await reqCategory(0)
        // // const newResult=result.filter((item)=>item.isDel===false)
        // this.setState({
        //     category: result
        // })
        this.reqCategroyDate("0")
    }

    render() {
        const {
            category,
            isShowAddCategory,
            isShowUpdateCategory,
            isShowSubCategory,
            subCategory,
            isLoading} = this.state
        console.log(subCategory)
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
                            {isShowSubCategory ? null : <MyButton onClick={this.showSubCategory(text)}>查看子类</MyButton>}

                            <MyButton onClick={this.deleteCategory(text)}>删除品类</MyButton>
                        </div>
                    )
                }
            },
        ]
        return (
            <div className='categoryWarp'>
                <Card title={isShowSubCategory
                    ? <div><MyButton onClick={this.hiddenSubCategory}>一级分类</MyButton><Icon
                        type='arrow-right'/>{this.currentPageMsg.parentName}</div>
                    : "一级分类"}
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
                                            categoryData={category}
                        />
                    </Modal>
                    <Table
                        columns={columns}
                        dataSource={isShowSubCategory ? subCategory : category}
                        bordered
                        rowKey={'_id'}
                        pagination={{
                            showSizeChanger: true,
                            defaultPageSize: 3,
                            showQuickJumper: true,
                            pageSizeOptions: ['3', '6', '9', '12']
                        }}
                        loading={isLoading}
                    />,
                </Card>
            </div>
        )
    }
}

