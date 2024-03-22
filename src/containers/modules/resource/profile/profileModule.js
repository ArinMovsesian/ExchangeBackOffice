import React from 'react';
import RouteModule from 'core/routeModule'
import route from './profileRoutes';

class ProfileModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default ProfileModule;