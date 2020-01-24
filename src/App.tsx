import React, {useEffect} from "react";
import userManager from './managers/userManager'
import {BrowserRouter} from "react-router-dom";
import Routes, {AppRouteBinder} from './routes/routes'
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

const allRoutes: Array<AppRouteBinder> = [
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

const App: React.FC = () => {

    useEffect(() => {
        userManager.welcome()
    });

    return (
        <BrowserRouter>
            <Routes routes={allRoutes}>
                <div>
                    Welcome
                </div>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
