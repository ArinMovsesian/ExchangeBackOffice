
import React from 'react';
import { UserAccessPagesContext } from '../contextes/userAccessPagesContext';

import { Switch, Route } from 'react-router-dom';
const RouteModule = function (props) {

    return (
        <UserAccessPagesContext.Consumer>
            {value => {
                let routes = [];
                if (value.length > 0) {

                    //   return              <Switch>   {
                    value.map(page => {
                        var accesseble = false;
                        var newRoute;
                        var id;
                        var routeArray = Object.keys(props.route);
                        for (let i = 0; i < routeArray.length; i++) {
                            if (page.pageLink === props.route[routeArray[i]].path) {

                                accesseble = true;
                                newRoute = props.route[routeArray[i]];
                                newRoute.id = i;

                                break;
                            }
                        }

                        if (accesseble) {
                            // console.log("ggg",newRoute);
                            // return <h1>{newRoute.path}</h1>
                            // <Route path={newRoute.path} id={id}
                            //     render={(routeProps) => React.createElement(newRoute.component, { ...routeProps, ...newRoute })} />
                            routes.push(newRoute);
                        }
                        // else{
                        //     return <h1>4444</h1>;

                        // }
                    })
                }
                // </Switch>


                return <Switch>
                    {routes.map(r => <Route path={r.path} id={r.id}
                        render={(routeProps) => React.createElement(r.component, { ...routeProps, ...r })} />)}
                </Switch>
            }}
        </UserAccessPagesContext.Consumer>




    )
}







export default RouteModule