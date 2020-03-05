import * as React from "react";
import {useContext} from "react";
import {App, AppState} from "../../data/models/app";
import {appReducer} from "./appReducer";
import {AppAction, AppUpdateAction} from "./appAction";
import {AppActions, loading} from "./appActions";
import {User} from "../../data/models/user";
import {UserProvider} from "./user/userContext";
import dataManager from "../../data/dataManager";
import {initialSession, Session} from "../../data/models/session";

export const app: App = dataManager.readObject<App>("app",{session: initialSession, user: {firstName: "", email: "test@gmail.com", lastName: ""}, appState: AppState.idle});

type AppHandler = {
    app: App
    appActions?: AppActions | undefined
}

const AppContext = React.createContext<AppHandler>({app});

type AppProviderProps = {
    children: React.ReactNode
}

export const useAppReducer = () => {
    return React.useReducer<React.Reducer<App, AppUpdateAction>>(appReducer, app);
};


export const AppProvider = ({children}: AppProviderProps) => {
    const [app, dispatch] = useAppReducer();

    const appActions: AppActions = {

        loading(): void {
            loading(dispatch,app)
        },

        done(): void {

        },

        processing(): void {

        },

        user(user: User): void {
            app.user = user;
            dispatch({appAction:AppAction.user,appUpdate:app})
        },

        session(session: Session): void {
            app.session = session;
            dispatch({appAction:AppAction.user,appUpdate:app})
        }
    };
    return (
        <AppContext.Provider value={{app, appActions}}>
            <UserProvider>
                {children}
            </UserProvider>
        </AppContext.Provider>
    )
};

export const useApp = () => {
    return useContext(AppContext);
};