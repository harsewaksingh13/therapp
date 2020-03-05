import {AppAction, AppUpdateAction} from "./appAction";
import {App} from "../../data/models/app";
import dataManager from "../../data/dataManager";


export function appReducer(app: App, appUpdateAction: AppUpdateAction): App {
    switch (appUpdateAction.appAction) {
        case AppAction.theme: {
            break
        }
        case AppAction.user: {
            break//handle in default action mutate whole object
        }
    }
    //always mutate the object
    let appState =  {...app, ...appUpdateAction.appUpdate}
    console.log("app state "+JSON.stringify(appState))
    dataManager.save("app",appState)
    return appState
}