import React from 'react';
import RouteModule from 'core/routeModule'
import route from './partyServiceRoutes';

class partyServiceModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default partyServiceModule;