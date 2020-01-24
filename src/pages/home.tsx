import React from "react";
import userManager from '../managers/userManager'

const handleLogout = () => {
    userManager.logout()
}

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>

            <button onClick = {handleLogout}>Logout</button>
        </div>
    );
};

export default Home;