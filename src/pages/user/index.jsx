import React, {Component,Fragment} from 'react';
import {Card, Button, Table, Modal,message} from "antd";
import dayjs from "dayjs";
import MyButton from '../../component/MyButton';
import {reqUser} from '../../api'
import AddUser from './addUser'


export default class User extends Component {
    state={
        users:[],
        roles:[],
        isShowAddUser:false,
        hasRole:false
    };
    toggleDisplay=(key,value)=>{
        return ()=>{
            this.setState({
            [key]:value
            })
        }
    }
    async componentDidMount(){
        this.setState({
            isLoading:true,
            success:false
        })
        const result=await reqUser()
        if(result){
            const {users,roles}=result
            if (roles.length===0) return message.warning('角色还没有设置，请先设置角色',1)
            else this.setState({
                users,
                roles,
                hasRole:true
            })
        }
    }
    render() {
        const {users,roles,isShowAddUser,hasRole}=this.state
        console.log(hasRole);
       // console.log(users,roles)
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
        }, {
            title:'电话',
            dataIndex: 'phone',
        }, {
            title:'邮箱',
            dataIndex:'email'
        }, {
            title:'注册时间',
            dataIndex:'create_time',
            render:(time)=>{
                return dayjs(time).format('YYYY-MM-DD HH-mm-ss')
            }
        }, {
            title:'所属角色',
            dataIndex:'role_id',
            render:(id)=>{
                if (id){
                    const {name}=roles.find((item)=>item._id===id)
                    return name
                }

            }
        },
            {
                title:'操作',
                // dataIndex:'role'，
                render:()=>{
                    return <Fragment>
                        <MyButton>修改</MyButton>
                        <MyButton>删除</MyButton>
                    </Fragment>
                }
            }
        ];

        return (
            <Fragment>
                <Card
                    title={
                        <Button type='primary' onClick={this.toggleDisplay('isShowAddUser',true)}>创建用户</Button>
                    }>

                    {
                        hasRole? <Table
                            columns={columns}
                            dataSource={users}
                            rowKey='_id'
                        />:<div style={{fontSize:'30px',textAlign:'center',margin:'0px 20px'}}>角色未设置，请先设置角色</div>
                    }
                </Card>

                <Modal
                    title="添加用户"
                    visible={isShowAddUser}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddUser roles={roles}/>
                </Modal>
            </Fragment>


        )
    }
}

