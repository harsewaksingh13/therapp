import * as React from 'react'
import {useContext} from "react";
import {LoginRequest} from "../../../api/models";
import {UserActions} from "./userActions";
import { useApp } from "../appContext";
import userManager from "../../../data/userManager";
import navigator from "../../navigation/appNavigator";
import {User} from "../../../data/models/user";
import {initialSession} from "../../../data/models/session";
import dataManager from "../../../data/dataManager";

const UserContext = React.createContext<UserActions | undefined>(undefined);


type UserProviderProps = {
    children: React.ReactNode
}


export const UserProvider = ({children}: UserProviderProps) => {
    const {app,appActions} = useApp();
    const userActions: UserActions = {
        login(loginRequest: LoginRequest): void {
            userManager.login(loginRequest).then(res => {
                appActions?.processing();
                navigator.user().home();
                //todo: parse from res object
                let user: User = {firstName: "Harsewak", lastName: "Singh", email: "test@gmail.com"}
                appActions?.user(user);
                appActions?.session(dataManager.readSession());
                appActions?.done()
            }).catch(error => {
                console.log("Error "+error.code);
                alert(error.text);
            })
        },
        logout(): void {
            userManager.logout().then(res => {
                //todo: handle logout dispatch
                let user: User = {firstName: "", lastName: "", email: app.user.email};
                appActions?.user(user);
                appActions?.session(initialSession)
            }).catch(error => {
                //todo: handle error dispatch
            })
        }
    };

    return (
        <UserContext.Provider value={userActions}>
            {children}
        </UserContext.Provider>
    )
};

//as userContext only providers actions
export const useUserActions = () => {
    return useContext(UserContext);
};

export const useUser = () => {
    return useApp().app.user
}