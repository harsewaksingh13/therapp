import React from 'react';
import userManager from '../managers/userManager'
import routeNavigator from "../routes/routeNavigator";

function handleLogin() {
   userManager.login({email:"test@gmail.com",password:"123456"}) .then(res => {

   }).catch(error => {
       routeNavigator.home()
   })
}

function handleRegisterFromLogin() {
    routeNavigator.register()
}

const Login: React.FC = () => {
  return (
    <div>
      Login Page
      <button onClick = {handleLogin}>Login</button>

        <button onClick = {handleRegisterFromLogin}>Register</button>

    </div>
  );
}

export default Login;