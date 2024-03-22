import React, { Component } from 'react';

import  route from './paymentAndReceiveRoutes'
import RouteModule from 'core/routeModule'

class PaymentAndReceiveModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default PaymentAndReceiveModule;


