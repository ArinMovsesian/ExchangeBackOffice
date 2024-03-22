import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import RouteModule from 'core/routeModule'

import route from './basicInformationRoutes';

class BasicInformationModule extends Component {

    render() {
        return (
         <RouteModule route={route} />
        )
    }
}

export default BasicInformationModule;


