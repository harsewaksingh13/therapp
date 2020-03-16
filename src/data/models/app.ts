import {User} from "./user";
import {Session} from "./session";
import {AppTheme} from "./theme";

export type App = {
    user : User
    session : Session
    appState : AppState
    appTheme : AppTheme
}

export enum AppState  {
    idle,loading,processing, done
}