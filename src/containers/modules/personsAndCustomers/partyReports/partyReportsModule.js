import React from 'react';
import RouteModule from 'core/routeModule'
import route from './partyReportsRoutes';

class partyReportsModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default partyReportsModule;