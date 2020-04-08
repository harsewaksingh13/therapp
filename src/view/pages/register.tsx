import React, {useState} from 'react';
import userManager from '../../data/userManager'
import {Button, ButtonSecondary, InputField} from "../components";
import Page from "../components/page/page";
import {useUser, useUserActions} from "../context/user/userContext";
import {LoginRequest, RegisterRequest} from "../../api/models";
import navigator from "../navigation/appNavigator";


function handleLoginFromRegister() {
    navigator.user().login()
}

const Register: React.FC = () => {
    const userActions = useUserActions();
    let user = useUser();
    const [request, setRegisterRequest] = useState<RegisterRequest>({
        email: user.email,
        password: "",
        firstName: "",
        lastName: ""
    });
    return (
        <Page pageTitle={"Register"}>

            <InputField
                placeholder="First Name"
                value={request.firstName}
                onChange={e => setRegisterRequest({
                    email: request.email,
                    password: request.password,
                    firstName: e.target.value,
                    lastName: request.lastName
                })}
            />
            <InputField
                placeholder="Last Name"
                value={request.lastName}
                onChange={e => setRegisterRequest({
                    email: request.email,
                    password: request.password,
                    firstName: request.firstName,
                    lastName: e.target.value
                })}
            />
            <InputField
                placeholder="Email"
                value={request.email}
                onChange={e => setRegisterRequest({
                    email: e.target.value,
                    password: request.password,
                    firstName: request.firstName,
                    lastName: request.lastName
                })}
            />
            <InputField
                placeholder="Password"
                type="Password"
                value={request.password}
                onChange={e => setRegisterRequest({
                    email: request.email,
                    password: e.target.value,
                    firstName: request.firstName,
                    lastName: request.lastName
                })}
            />
            <Button
                onClick={() => {
                    userActions?.register(request)
                }}>Register</Button>

            <ButtonSecondary onClick={handleLoginFromRegister}>Login</ButtonSecondary>

        </Page>
    );
};

export default Register;