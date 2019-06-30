import { Modal, Button,Form,Input,Tree  } from 'antd';
import React,{Component,Fragment} from 'react';
import menuList from '../../config/menuConfig'
const {Item}=Form;


const { TreeNode } = Tree;

 class SetRole extends Component {
     state = {
         expandedKeys: ['0-0-0', '0-0-1'],
         autoExpandParent: true,
         checkedKeys: ['1'],
         selectedKeys: [],
     };
     onExpand = expandedKeys => {
         console.log('onExpand', expandedKeys);
         // if not set autoExpandParent to false, if children expanded, parent can not collapse.
         // or, you can remove all expanded children keys.
         this.setState({
             expandedKeys,
             autoExpandParent: false,
         });
     };
    //树形控件选中的回调函数，返回值为key值
     onCheck = checkedKeys => {
            console.log(checkedKeys)
           //  const checkedKeys=checked.find((item)=>item.key!=='1')
             this.setState({
                 checkedKeys
             });

     };

     renderTreeNodes = data =>
         data.map(item => {
             if (item.children) {
                 return (
                     <TreeNode title={item.title} key={item.key} dataRef={item}>
                         {this.renderTreeNodes(item.children)}
                     </TreeNode>
                 );
             }
             return <TreeNode {...item} />;
         });

render() {
    const {getFieldDecorator}=this.props.form
    const treeData= menuList



    // const treeData = menuList;
    return (
           <Fragment>
               <Form>
                   <Item label='角色名称'>
                       {
                           getFieldDecorator(
                               'name',
                       {
                           initialValue:this.props.name
                       }
                           )(
                               <Input disabled/>
                           )
                       }
                   </Item>
                   <Item>
                       <Tree
                           checkable
                           /*收起节点触发的函数*/
                           onExpand={this.onExpand}
                           expandedKeys={this.state.expandedKeys}
                           autoExpandParent={this.state.autoExpandParent}
                           /*点击复选框触发*/
                           onCheck={this.onCheck}

                           checkedKeys={this.state.checkedKeys}
                           /*点击树节点触发
                            onSelect={this.onSelect}*/
                           selectedKeys={this.state.selectedKeys}
                       >
                           <TreeNode title='平台权限' key={-1}>
                               {this.renderTreeNodes(menuList)}
                           </TreeNode>

                       </Tree>
                   </Item>
               </Form>


           </Fragment>
        )
    }
}
export default Form.create()(SetRole)
