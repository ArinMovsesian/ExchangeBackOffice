import React from 'react';
import RouteModule from 'core/routeModule';
import route from './accessRoues';

class AccessModule extends React.Component{
    
    render(){
        return (
            <RouteModule  route={route}/>
        )
    }
}


export default AccessModule;