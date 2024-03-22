import React, { Component } from 'react';

import  route from './paymentRoutes'
import RouteModule from 'core/routeModule'

class PaymentModule extends Component {

    render() {
        
        return (
            <RouteModule route={route} />
        )
    }
}

export default PaymentModule;


