import React, { useState} from 'react';
import navigator from "../navigation/appNavigator";
import {LoginRequest} from "../../api/models";
import {useUser, useUserActions} from "../context/user/userContext";


function handleRegisterFromLogin() {
    navigator.user().register()
}

const Login: React.FC = () => {

    const userActions = useUserActions();
    let user = useUser();
    const [request,setLoginRequest] = useState<LoginRequest>({email:user.email ,password:"123456"});

    return (
    <div>
        <input
            name="email"
            value={request.email}
            onChange={e => setLoginRequest({email:e.target.value, password:request.password})}
        />
        <input
            name="password"
            value={request.password}
            onChange={e => setLoginRequest({email:request.email, password:e.target.value})}
        />
      <h1>Login</h1>
      Login Page
      <br></br>
      <br></br>
      <button onClick = { () => {
          userActions?.login(request)
      }}>Login</button>
      <br></br>
      <br></br>
      <button onClick = {handleRegisterFromLogin}>Register</button>
    </div>
  );
};

export default Login;