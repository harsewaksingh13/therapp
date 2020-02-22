import React from 'react';
import userManager from '../data/userManager'
import routeNavigator from "../routes/routeNavigator";

function handleLogin() {
   userManager.login({email: "testkjkk@gmail.com",password: "123456"}).then(res => {
      routeNavigator.user().home()
   }).catch(error => {
    console.log("Error "+error.code);
    alert(error.message)
  })
}

function handleRegisterFromLogin() {
    routeNavigator.user().register()
}

const Login: React.FC = () => {
  return (
    <div >
      <h1>Login</h1>
      Login Page
      <br></br>
      <br></br>
      <button onClick = {handleLogin}>Login</button>
      <br></br>
      <br></br>
      <button onClick = {handleRegisterFromLogin}>Register</button>
    </div>
  );
};

export default Login;