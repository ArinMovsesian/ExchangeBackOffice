import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersModule from './users/usersModule';
import ProfileModule from './profile/profileModule';
import AccessModule from './access/accessModule';

class ResourceModule extends React.Component {
    render() {
        return(
            <div className="height-page">
                <Switch>
                    <Route path="/main/resource/access" component={AccessModule}/>
                    <Route path="/main/resource/users" component={UsersModule}/>
                    <Route path="/main/resource/profile" component={ProfileModule}/>
                </Switch>
            </div>

        )    
    }
}
export default ResourceModule; 