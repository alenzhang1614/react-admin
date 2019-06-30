import React, {Component,Fragment} from 'react';
import {Card, Button, Form, Table, Radio, Modal, message} from "antd";
import './index.less'
import {getRole, addRole, updateRole,deleteRole} from '../../api'
import CreatRole from './creatRole'
import SetRole from './setRole'
import dayjs from 'dayjs'
import {getItem} from "../../ulit/storage_tools";
const { confirm } = Modal

const {Group} = Radio


export default class Role extends Component {
    state = {
        value: '',
        roleData: [],
        isDisable: true,
        isShowCreatRole: false,
        isShowSetRole: false,
        isLoading: true,
        hasRole:false
    }
    setRoleBtn = (e) => {
        const roleId = e.target.value
        this.setState({
            value: roleId,
            isDisable: false,
        })
    }
    //显示设置角色对话框
    toggleDisplay = (stateName, staus) => {
        return () => this.setState({
            [stateName]: staus,
        })
    }
    //保存角色
    saveRole = () => {
        const {roleData} = this.state
        const {validateFields,resetFields}=this.addRoleForm.props.form
        validateFields(async (err, value) => {
            /*校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        *参数：fildname，option，callback（err，values）
        * */
           // console.log(this)
            if (err) {
                return;
            }
            this.setState({
                isLoading: true
            });
            const result = await addRole(value);
            if (result) {
                message.success('添加角色成功', 1);
                resetFields()
                this.setState({
                    roleData: [...roleData, result],
                    isShowCreatRole: false,
                    isLoading: false,
                    value: result._id,
                    hasRole:true
                })
            }
        })
    }
    // 隐藏对话框
    //显示删除对话框
    showDelete=()=>{
        confirm({
            title: '确定要删除',
            content: 'Some descriptions',
            onOk:()=> {
                const role_id=this.state.value
                this.deleteRole(role_id)
            },
        });
    }
    //删除角色

    deleteRole=async (role_id)=>{
        const result =await deleteRole(role_id)
        if (result){
            message.success('删除角色成功',1)
            const {roleData}=this.state
            const newValue=roleData.reduce((prev,curr,index,arr)=>{
                let value=''
                if (curr._id===role_id){
                    (arr[index+1]&& (value =arr[index+1]._id))|| (arr[index-1]&&(value=arr[index-1]._id))
                }
                    return prev+value
            },'')

            this.setState(
                {
                    roleData:roleData.filter((item)=>item._id!==role_id),
                    value:newValue,
                    hasRole:newValue?true:false
                })
        }
    }
    saveUpdateRole = async () => {
        const _id = this.state.value
        const menus = this.setRoleForm.state.checkedKeys
        const auth_name = getItem().username
        this.setState({
            isLoading: true
        })
        const result = await updateRole({_id, auth_name, menus})
        if (result) {
            message.success('设置权限成功')
            const role = result._doc;
            console.log(role)
            this.setState({
                roleData: this.state.roleData.map((item) => {
                    if (item._id === role._id) return {...item, ...role}
                    else return item
                }),
                isShowSetRole: false,
                isLoading: false
            })
        }
    }


    async componentDidMount() {
        //请求权限数据
        this.setState({
            isLoading: true
        })
        const roleData = await getRole()
        if (roleData) {
            this.setState({
                roleData: roleData,
                isLoading: false,
                hasRole:true
            })
        }
    }

    render() {
        const {hasRole,isDisable, isShowCreatRole, isLoading, roleData, isShowSetRole, value} = this.state
        const columns = [
            {
                title: '',
                dataIndex: '_id',
                render: (id) => {
                    return <Radio value={id}></Radio>
                }
            },
            {
                title: '角色名称',
                dataIndex: 'name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (time) => {
                    return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
                }
            }, {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (time) => {
                    return time ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : ''
                }
            }, {
                title: '授权时间',
                dataIndex: "auth_name"
            }
        ]
        let role = null
        //更该角色时将用户名传给组件
        if (roleData) {
            role = roleData.find((item) => item._id === value)
        }

        return (
            <Fragment>
                <Card
                    title={
                        <div>
                            <Button type='primary'
                                    onClick={this.toggleDisplay('isShowCreatRole', true)}>创建角色</Button>
                            <Button type='primary'
                                    className='setRoleBtn'
                                    disabled={isDisable}
                                    onClick={this.toggleDisplay('isShowSetRole', true)}>设置角色权限</Button>
                            <Button type='primary'
                                    disabled={isDisable}
                                    onClick={this.showDelete}>删除角色</Button>
                        </div>}
                >
                    {
                        hasRole?<Group  style={{width: '100%'}} value={value} onChecked={this.setRoleBtn}>
                                <Table
                                    columns={columns}
                                    dataSource={this.state.roleData}
                                    rowKey={'_id'}
                                    bordered
                                    loading={isLoading}
                                    pagination={
                                        {
                                            defaultPageSize: 3,
                                            showQuickJumper:true,
                                            showSizeChanger:true,
                                            pageSizeOptions:['5','10','15','20']
                                        }

                                    }
                                >
                                </Table>
                            </Group>
                            :<div style={{fontSize:'30px',textAlign:'center',margin:'0px 20px'}}>还没有角色，请创建角色!!!</div >
                    }

                </Card>
                <Modal
                    title="创建角色"
                    visible={isShowCreatRole}
                    onOk={this.saveRole}
                    //  confirmLoading={confirmLoading}
                    onCancel={this.toggleDisplay('isShowCreatRole', false)}
                >
                    <CreatRole wrappedComponentRef={(form) => this.addRoleForm = form}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowSetRole}
                    onOk={this.saveUpdateRole}
                    //  confirmLoading={confirmLoading}
                    onCancel={this.toggleDisplay('isShowSetRole', false)}
                >
                    <SetRole wrappedComponentRef={(form) => this.setRoleForm = form} name={role ? role.name : ''}/>
                </Modal>

            </Fragment>

        )
    }
}

