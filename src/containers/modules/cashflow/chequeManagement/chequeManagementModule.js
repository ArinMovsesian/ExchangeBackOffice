import React, { Component } from 'react';

import  route from './chequeManagementRoutes'
import RouteModule from 'core/routeModule'

class ChequeManagementModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default ChequeManagementModule;


