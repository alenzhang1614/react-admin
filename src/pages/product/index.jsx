import React, {Component} from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import Detail from './detail';
import Index from './index/index'
import SaveUpdate from './saveUpdate'


export default class Product extends Component {

    render() {
        return (
            <Switch>
                <Route path='/product/index' component={Index}/>
                <Route path='/product/detail' component={Detail}/>
                <Route path='/product/saveUpdate' component={SaveUpdate}/>
                <Redirect to='/product/index'/>
            </Switch>
        )
    }
}

