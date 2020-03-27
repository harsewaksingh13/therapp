import React, {useState} from 'react';
import navigator from "../navigation/appNavigator";
import {LoginRequest} from "../../api/models";
import {useUser, useUserActions} from "../context/user/userContext";
import {Button, InputField, NavigationPage, Section} from "../components";
import {useAppState} from "../context/appContext";
import {AppState} from "../../data/models/app";


function handleRegisterFromLogin() {
    navigator.user().register()
}

const Login: React.FC = () => {

    const userActions = useUserActions();
    let user = useUser();
    const [request,setLoginRequest] = useState<LoginRequest>({email:user.email ,password:"123456"});
    let appState = useAppState();
    let appStateString = "Idle";
    if (appState === AppState.idle) {
        appStateString = "Idle"
    }
    if (appState === AppState.processing) {
        appStateString = "Processing"
    }
    if (appState === AppState.loading) {
        appStateString = "Loading"
    }
    if (appState === AppState.done) {
        appStateString = "Done"
    }
    return (
    <NavigationPage>
        <h1>Login</h1>
        <InputField
            placeholder="Email"
            value={request.email}
            onChange={e => setLoginRequest({email:e.target.value, password:request.password})}
        />
        <InputField
            placeholder="Password"
            type="text"
            value={request.password}
            onChange={e => setLoginRequest({email:request.email, password:e.target.value})}
        />
        <Section>
            <Button style={{margin:"10px"}}
                onClick = { () => {
                    userActions?.login(request)
                }}>Login</Button>

            <Button style={{backgroundColor:"black", margin:"10px"}} onClick = {handleRegisterFromLogin}>Register</Button>
            <h3>{appStateString}</h3>
        </Section>

    </NavigationPage>
  );
};

export default Login;