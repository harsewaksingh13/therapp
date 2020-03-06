import {User} from "./user";
import {Session} from "./session";

export type App = {
    user : User
    session : Session
    appState : AppState
}

export enum AppState  {
    idle,loading,processing, done
}