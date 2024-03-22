import React from 'react';
import RouteModule from 'core/routeModule'
import route from './usersRoutes';

class UsersModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default UsersModule;