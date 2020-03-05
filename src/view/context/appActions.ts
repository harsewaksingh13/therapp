import * as React from "react";
import {AppAction, AppUpdateAction} from "./appAction";
import {App} from "../../data/models/app";
import {User} from "../../data/models/user";
import {Session} from "../../data/models/session";

export function loading(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    dispatch({appAction:AppAction.loading,appUpdate:app})
}

export function processing(dispatch: React.Dispatch<AppUpdateAction>, app: App) {
    dispatch({appAction:AppAction.processing,appUpdate:app})
}


export type AppActions = {
    loading() : void
    processing() : void
    done() : void
    user(user: User) : void
    session(session: Session) : void
}