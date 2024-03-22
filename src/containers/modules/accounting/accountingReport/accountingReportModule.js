import React, { Component } from 'react';

import  route from './accountingReportRoutes'
import RouteModule from 'core/routeModule'

class AccountingReportModule extends Component {

    render() {
       
        return (
         <RouteModule route={route} userAccessPages={this.props.userAccessPages} />
        )
    }
}

export default AccountingReportModule;


