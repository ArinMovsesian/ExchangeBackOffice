import React from 'react';
import RouteModule from 'core/routeModule'
import route from './partyGroupRoutes';

class PartyGroupModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default PartyGroupModule;