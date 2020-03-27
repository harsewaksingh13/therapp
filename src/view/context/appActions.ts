import * as React from "react";
import {AppAction, AppUpdateAction} from "./appAction";
import {App, AppState} from "../../data/models/app";
import {User} from "../../data/models/user";
import {Session} from "../../data/models/session";

export function loading(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    app.appState = AppState.loading;
    dispatch({appAction:AppAction.loading,appUpdate:app})
}

export function processing(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    app.appState = AppState.processing;
    dispatch({appAction:AppAction.processing,appUpdate:app})
}

export function done(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    app.appState = AppState.done;
    dispatch({appAction:AppAction.processingDone,appUpdate:app})
}

export function idle(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    app.appState = AppState.idle;
    dispatch({appAction:AppAction.processingDone,appUpdate:app})
}


export type AppActions = {
    loading() : void
    processing() : void
    done() : void
    idle() : void
    user(user: User) : void
    session(session: Session) : void
}