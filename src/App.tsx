import React, {useEffect} from "react";
import userManager from './data/userManager'
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import history from "./view/navigation/history";
import appNavigator from "./view/navigation/appNavigator";
import {AppRoute} from "./view/navigation/appRoute";
import {AppProvider} from "./view/context/appContext";


const Routes: React.FC = () => {
    return (
        <Router history={history}>
            <Switch>
                {appNavigator.appRoutes().map((route: AppRoute) => {
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


const App: React.FC = () => {

    useEffect(() => {
        userManager.welcome()
    });
    return (
        <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <div>
                            Welcome
                        </div>
                    </Routes>
                </BrowserRouter>
        </AppProvider>
    );
};

export default App;