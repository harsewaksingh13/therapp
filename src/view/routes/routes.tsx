import React from 'react';
import {Router, Switch, Route} from "react-router-dom";
import history from './history';
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";

export interface AppRouteBinder {
    key: string
    path: string
    component: React.FC
}

export interface AppRoutes {
    routes: Array<AppRouteBinder>
}


export const allRoutes: Array<AppRouteBinder> = [
    {
        key: "login",
        path: "/login",
        component: Login
    },{
        key: "register",
        path: "/register",
        component: Register
    },{
        key: "home",
        path: "/home",
        component: Home
    }
];

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