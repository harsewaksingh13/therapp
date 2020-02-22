import React, {useContext} from 'react';
import routeNavigator from "../routes/routeNavigator";
import {initialSession, reducer} from "../context/userContext";
import {Session} from "../models/session";
import actions, {Action} from "../models/actions";
import {UserAction} from "../models/user";
import userManager from "../data/userManager";



const Login: React.FC = () => {

    const [state, dispatch] = React.useReducer<React.Reducer<Session, Action<UserAction,Session>>>(reducer, initialSession);

    function handleLoginClick() {
        userManager.login({email: "bbnnharse.s@gmail.com",password: "123456"}).then(res => {
            console.log("login response "+JSON.stringify(res))
            let session : Session = { token:'', user: res};
            routeNavigator.user().home()

            dispatch({ type: actions.user.Login, payload: session });
            console.log("user "+state.user?.email)
        }).catch(error => {
            console.log("Error "+error.code)
           // alert(error.text)
        });
    }

    function handleRegisterFromLogin() {
        routeNavigator.user().register()
    }


  return (
    <div>
      <h1>Login</h1>
      Login Page
      <br></br>
      <br></br>
      <button onClick = {handleLoginClick}>Login</button>
      <br></br>
      <br></br>
      <button onClick = {handleRegisterFromLogin}>Register</button>
    </div>
  );
}

export default Login;