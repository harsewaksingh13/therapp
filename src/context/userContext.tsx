import React from 'react';
import actions, {Action} from "../models/actions";
import {Session} from "../models/session";
import routeNavigator from "../routes/routeNavigator";
import userManager from "../data/userManager";
import {User, UserAction} from "../models/user";

export const initialUser : User = {
    firstName : '',
    lastName : '',
    email:''
}

export const initialSession : Session = {
    token:'',
    user: initialUser
}

export const reducer: React.Reducer<Session, Action<UserAction,Session>> = (state, action) => {
    switch (action.type) {
        case actions.user.UpdateProfile:
            return { ...state, user: action.payload.user}
        default :
            return {...state}
    }
}

export const userActions = (dispatch : React.Dispatch<Action<UserAction,Session>>) => { return {
    loginAction : () => {
        userManager.login({email: "harse.s@gmail.com",password: "123456"}).then(res => {
            let session : Session = { token:'', user: res};
            routeNavigator.user().home()
            dispatch({ type: actions.user.Login, payload: session });

        }).catch(error => {
            console.log("Error "+error.code)
            alert(error.text)
        });
    },
    register : () => {
        //todo: change user to api returned user
        let session : Session = { token:'', user:initialUser};
        dispatch({ type: actions.user.Register, payload: session });
    },

    logout : () => {
        dispatch({ type: actions.user.Logout, payload: {token:""} });
    }
}};

// export type UserContextDispatch = {
//     state : Session
//     dispatch : React.Dispatch<Action<UserAction,Session>>
// }

const UserContext = React.createContext({});
UserContext.displayName = 'UserContext';

const UserContextProvider = (props:any) => {

    const [state, dispatch] = React.useReducer<React.Reducer<Session, Action<UserAction,Session>>>(reducer, initialSession);

    return (
        <UserContext.Provider value={ { ...state,  ...userActions(dispatch) } } >
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext };