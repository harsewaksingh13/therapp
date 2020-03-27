import React from "react";
import {useUser, useUserActions} from "../context/user/userContext";
import {NavigationPage} from "../components";

const Home: React.FC = () => {
    let user = useUser();
    let userActions = useUserActions();
    return (
        <NavigationPage>
            <h1>Home Page </h1>
            <h3>{user.email}</h3>
            Name
            <h2>{user.firstName}</h2>
            <button onClick = {()=>{
                userActions?.logout()
            }}>Logout</button>
        </NavigationPage>
    );
};

export default Home;