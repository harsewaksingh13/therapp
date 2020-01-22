import React from 'react';
import userInteractor from '../interactors/userInteractor'

function handleLogin() {
   userInteractor.login({email:"test@gmail.com",password:"123456"}) 
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