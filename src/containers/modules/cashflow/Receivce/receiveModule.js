import React, { Component } from 'react';

import  route from './receiveRoutes'
import RouteModule from 'core/routeModule'

class ReceiveModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default ReceiveModule;


