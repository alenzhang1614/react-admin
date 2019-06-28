import React, {Component} from 'react';
import {Card, Button, Form, Table, Radio, Modal,message} from "antd";
import './index.less'
import {getRole,addRole}from '../../api'
import CreatRole from './creatRole'
import SetRole from './setRole'
import dayjs from 'dayjs'
const {Group}=Radio


export default class Role extends Component {
    state={
        value:'',
        roleDate:[],
        isDisable:true,
        isShowCreatRole:false,
        isShowSetRole:false,
        isLoading:true
    }
    setRoleBtn=(e)=>{
        const roleId = e.target.value
        this.setState({
            value : roleId,
            isDisable:false,
        })
    }
    //显示设置角色对话框
    toggleDisplay=(stateName,staus)=>{
        return ()=> this.setState({
            [stateName]:staus,
        })
    }
    //保存角色
    saveRole=()=>{
        const {roleData}=this.state
        this.addRoleForm.props.form.validateFields(async (err,value,callback)=>{
            if (err) return callback('输入有误请重新输入');
            const isSameName=roleData.find((item)=> item.name===value.name)
           if(isSameName)return callback('该权限名称已存在，请重新输入，或者修改权限');
           else {
               this.setState({
                   isLoading:true
               })
               const result=await addRole(value)
               if (result){
                   message.success('添加角色成功',1)
                   this.setState({
                       roleData:[...roleData,result],
                       isShowCreatRole:false,
                       isLoading:false
                   })
               }

           }
        })

    }
    隐藏对话框
    saveUpdateRole=()=>{
        this.setState({
            isShowSetRole:false
        })
    }

    async componentDidMount() {
        //请求权限数据
        this.setState({
            isLoading:true
        })
        const roleData=await getRole()
        if(roleData){
            this.setState({
                roleData:roleData,
                isLoading:false
            })
        }
    }

    render() {
        const {isDisable,isShowCreatRole,isLoading,roleData,isShowSetRole,value}=this.state
        console.log(roleData);
        const columns = [
            {
                title: '',
                dataIndex:'_id',
                render:(id)=>{
                    return <Radio value={id}></Radio>
                }
            },
            {
                title: '角色名称',
                dataIndex: 'name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render:(time)=>{
                   return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
                }
            }, {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(time)=>{

                    return time?dayjs(time).format("YYYY-MM-DD HH:mm:ss"):''
                }
            }, {
                title: '授权时间',
                dataIndex: "auth_name"
            }
        ]
        let role=null
        //更该角色时将用户名传给组件
        if (roleData){
            role=roleData.find((item)=>item._id===value)
        }



        return (
            <div>
                <Card
                    title={
                        <div>
                            <Button type='primary' className='creatRoleBtn' onClick={this.toggleDisplay('isShowCreatRole',true)}>创建角色</Button>
                            <Button type='primary'
                                    disabled={isDisable}
                                    onClick={this.toggleDisplay('isShowSetRole',true)}>设置角色权限</Button>
                        </div>}
                >
                    <Group onChange={this.setRoleBtn} style={{width: '100%'}}>
                        <Table
                            columns={columns}
                            dataSource={this.state.roleData}
                            rowKey={'_id'}
                            bordered
                            loading={isLoading}
                        >
                        </Table>
                    </Group>


                </Card>
                <Modal
                    title="创建角色"
                    visible={isShowCreatRole}
                    onOk={this.saveRole}
                  //  confirmLoading={confirmLoading}
                   onCancel={this.toggleDisplay('isShowCreatRole',false)}
                >
                    <CreatRole wrappedComponentRef={(form) => this.addRoleForm = form}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowSetRole}
                    onOk={this.saveUpdateRole}
                    //  confirmLoading={confirmLoading}
                    onCancel={this.toggleDisplay('isShowSetRole',false)}
                >
                    <SetRole wrappedComponentRef={(form) => this.setRoleForm = form} name={role?role.name:''}/>
                </Modal>
            </div>

        )
    }
}

