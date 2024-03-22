import React from 'react';
import RouteModule from 'core/routeModule'
import route from './customersRoutes';

class CustomersModule extends React.Component {

    render() {
 
        return (
           <RouteModule route={route}/>
        )
    }
}

export default CustomersModule;