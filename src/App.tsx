import React, {useEffect} from "react";
import userManager from './data/userManager'
import {BrowserRouter} from "react-router-dom";
import Routes, {allRoutes, AppRouteBinder} from './routes/routes'
import {UserContextProvider} from "./context/userContext";



const App: React.FC = () => {

    useEffect(() => {
        userManager.welcome()
    });

    return (
        <UserContextProvider>
        <BrowserRouter>
            <Routes routes={allRoutes}>
                <div>
                    Welcome
                </div>
            </Routes>
        </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
