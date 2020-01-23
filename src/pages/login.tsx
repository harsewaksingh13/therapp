import React from 'react';
import userManager from '../managers/userManager'

function handleLogin() {
   userManager.login({email:"test@gmail.com",password:"123456"}) .then(res => {

   })
}

const Login: React.FC = () => {
  return (
    <div>
      Login Page
      <button onClick = {handleLogin}>Login</button>
    </div>
  );
}

export default Login;