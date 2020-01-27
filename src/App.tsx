import React, {useEffect} from "react";
import userManager from './data/userManager'
import {BrowserRouter} from "react-router-dom";
import Routes, {allRoutes, AppRouteBinder} from './routes/routes'



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
