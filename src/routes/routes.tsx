import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export interface AppRouteBinder {
    path : string
    component : React.FC
}


const Routes : React.FC<[AppRouteBinder]> = (appRoutes : [AppRouteBinder]) => {
    // appRoutes.map( routeBinder => {
    //     console.log("Routes props "+routeBinder.path)
    // })
    

    return (
        <Router>
            { 
              appRoutes.map( routeBinder => { 
                return (
                    <Route exact path={routeBinder.path} component={routeBinder.component}/>
                    )
                })
            }
        </Router>
    )
}

export default Routes