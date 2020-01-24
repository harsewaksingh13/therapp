import React from 'react';
import {Router, Switch, Route} from "react-router-dom";
import history from './history';

export interface AppRouteBinder {
    key: string
    path: string
    component: React.FC
}

export interface AppRoutes {
    routes: Array<AppRouteBinder>
}


const Routes: React.FC<AppRoutes> = (props) => {
    return (
        <Router history={history}>
            <Switch>
                {props.routes.map((route: AppRouteBinder) => {
                    return (
                        <Route key={route.key} exact path={route.path}>
                            <route.component/>
                        </Route>
                    )
                })}
            </Switch>
        </Router>
    )
};

export default Routes