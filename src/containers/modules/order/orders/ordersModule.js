import React, { Component } from 'react';

import  route from './ordersRoutes'
import RouteModule from 'core/routeModule'

class OrdersModule extends Component {

    render() {
       
        return (
         <RouteModule route={route} />
        )
    }
}

export default OrdersModule;


