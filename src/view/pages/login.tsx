import React, {useState} from 'react';
import navigator from "../navigation/appNavigator";
import {LoginRequest} from "../../api/models";
import {useUser, useUserActions} from "../context/user/userContext";
import {Button, ButtonSecondary, InputField, NavigationPage} from "../components";

function handleRegisterFromLogin() {
    navigator.user().register()
}

const Login: React.FC = () => {

    const userActions = useUserActions();
    let user = useUser();
    const [request, setLoginRequest] = useState<LoginRequest>({email: user.email, password: "123456"});
    return (
        <NavigationPage>
            <h1>Login</h1>
            <InputField
                placeholder="Email"
                value={request.email}
                onChange={e => setLoginRequest({email: e.target.value, password: request.password})}
            />
            <InputField
                placeholder="Password"
                type="text"
                value={request.password}
                onChange={e => setLoginRequest({email: request.email, password: e.target.value})}
            />
            <Button
                onClick={() => {
                    userActions?.login(request)
                }}>Login</Button>

            <ButtonSecondary onClick={handleRegisterFromLogin}>Register</ButtonSecondary>

        </NavigationPage>
    );
};

export default Login;