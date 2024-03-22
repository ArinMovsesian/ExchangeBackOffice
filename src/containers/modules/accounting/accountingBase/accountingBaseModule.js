import React, { Component } from 'react';

import  route from './accountingBaseRoutes'
import { element } from 'prop-types';
import RouteModule from 'core/routeModule'

class AccountingBaseModule extends Component {

    render() {
       
        return (
         <RouteModule route={route} />
        )
    }
}

export default AccountingBaseModule;


