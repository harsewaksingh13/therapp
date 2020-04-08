import React from "react";
import {useUser, useUserActions} from "../context/user/userContext";
import {ButtonSecondary, NavigationPage} from "../components";

const Home: React.FC = () => {
    let user = useUser();
    let userActions = useUserActions();
    return (
        <NavigationPage>
            <h1>Home Page </h1>
            <h3>{user.email}</h3>
            Name
            <h2>{user.firstName}</h2>
            <ButtonSecondary onClick = {()=>{
                userActions?.logout()
            }}>Logout</ButtonSecondary>
        </NavigationPage>
    );
};

export default Home;