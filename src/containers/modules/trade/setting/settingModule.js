import React, { Component } from 'react';

import  route from './settingRoutes'
import RouteModule from 'core/routeModule'

class SettingModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default SettingModule;


