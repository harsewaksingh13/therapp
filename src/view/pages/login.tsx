import React from 'react';
import userManager from '../../data/userManager'
import navigator from "../navigation/appNavigator";

function handleLogin() {
   userManager.login({email: "test@gmail.com",password: "123456"}).then(res => {
       navigator.user().home()
   }).catch(error => {
    console.log("Error "+error.code);
    alert(error.text) 
  })
}

function handleRegisterFromLogin() {
    navigator.user().register()
}

const Login: React.FC = () => {
  return (
    <div>
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
}

export default Login;