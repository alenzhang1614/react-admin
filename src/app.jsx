import React,{Component} from 'react';
import Login from './pages/login';
import Main from './pages/main'
import './assets/less/index.less'

import {Route,Switch,Redirect} from 'react-router-dom'
export default class App extends Component{
    render() {
        return(
            <Switch>
                <Route path='/Login' component={Login}/>
                <Route path='/' component={Main}/>
                <Redirect to='/Login'/>
            </Switch>
        )
    }
}