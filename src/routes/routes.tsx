import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface AppRouteBinder {
    path : string
    component : React.FC
}

const Routes : React.FC<[AppRouteBinder]> = (props) => {
    return (
        //todo: return bounded app routes
        <Router>
            {props.map( routeBinder => {
                <Route path={routeBinder.path} component={routeBinder.component}/>
            })}
        </Router>
    )
}

export default Routes