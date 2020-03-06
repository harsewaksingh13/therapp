import {App} from "../../data/models/app";

export type AppUpdateAction = {
    appAction: AppAction
    appUpdate: App
}

export enum AppAction {
    /**
     * Should be used whenever there is get/refresh/fetch action
     * */
    loading,
    /**
     * Should be used whenever there is post action by user
     * */
    processing,
    /**
     * completed the loading
     * */
    loadingDone,
    /**
     * completed the processing
     * */
    processingDone,
    /**
     * updated the theme object
     * */
    theme, user,
}