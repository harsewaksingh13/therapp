import * as React from "react";
import {useContext} from "react";
import {App, AppState} from "../../data/models/app";
import {appReducer} from "./appReducer";
import {AppAction, AppUpdateAction} from "./appAction";
import {AppActions, done, idle, loading, processing} from "./appActions";
import {User} from "../../data/models/user";
import {UserProvider} from "./user/userContext";
import dataManager from "../../data/dataManager";
import {initialSession, Session} from "../../data/models/session";
import {ThemeProvider} from "styled-components";

export const app: App = dataManager.readObject<App>("App", {
    session: initialSession,
    user: {firstName: "", email: "test@gmail.com", lastName: ""},
    appState: AppState.idle,
    appTheme: {
        primaryColor: "red",
        secondaryColor:"green",
        backgroundColor: "white"
    }
});

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
            loading(dispatch, app)
        },

        done(): void {
            done(dispatch,app);
        },

        idle() : void {
          idle(dispatch,app);
        },

        processing(): void {
            processing(dispatch,app)
        },

        user(user: User): void {
            app.user = user;
            dispatch({appAction: AppAction.user, appUpdate: app})
        },

        session(session: Session): void {
            app.session = session;
            dispatch({appAction: AppAction.user, appUpdate: app})
        }
    };
    return (
        <AppContext.Provider value={{app, appActions}}>
            {/*styled components*/}
            <ThemeProvider theme={app.appTheme}>
                <UserProvider>
                 {children}
                </UserProvider>
            </ThemeProvider>
        </AppContext.Provider>
    )
};

export const useApp = () => {
    return useContext(AppContext);
};

export const useAppState = () => {
    return useApp().app.appState
};

export const useAppTheme = () => {
    return useApp().app.appTheme
};