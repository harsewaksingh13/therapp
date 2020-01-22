import React from 'react';
import userInteractor from '../interactors/userInteractor'

function handleRegister() {
  userInteractor.register({firstName: "Type", lastName:"Test", email:"test@gmail.com",password:"123456"}) 
}

const Register: React.FC = () => {
  return (
    <div>
      Register Page
      <button onClick = {handleRegister}>Register</button>
    </div>
  );
}

export default Register;