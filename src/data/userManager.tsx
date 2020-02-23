import {LoginRequest} from '../api/models'
import {RegisterRequest} from '../api/models'
import apiManager from '../api/apiManager'
import routeNavigator from '../view/routes/routeNavigator'
import {AuthResponse} from "../api/models/authResponse";
import {toUser, User} from "./models/user";
import dataManager from "./dataManager";


export interface UserManager {
    //display welcome page or handle redirection logic depending session
    welcome() : void
    login(loginRequest: LoginRequest) : Promise<User>
    register(registerRequest: RegisterRequest) : Promise<User>
    logout() : Promise<Boolean>
}

class UserManagerImpl implements UserManager {

    login(loginRequest: LoginRequest): Promise<User> {
        return new Promise<User>( (resolve,rejects) => {
            apiManager.user().login(loginRequest).response<AuthResponse>().then(res => {
                let response = res.data;
                this.resolveUser(response,resolve)
            }).catch(rejects)
        })
    }

    register(registerRequest: RegisterRequest) : Promise<User> {
        return new Promise<User>( (resolve,rejects) => {
            apiManager.user().register(registerRequest).response<AuthResponse>().then(response => {
               this.resolveUser(response.data,resolve)
            }).catch(rejects)
        })
    }

    private resolveUser = (response: AuthResponse, resolve : Function) => {
        dataManager.session(response.user.email, response.user._id, response.accessToken);
        resolve(toUser(response.user))
    };

    welcome() : void {
        if(dataManager.hasSession()){
            routeNavigator.user().home()
        } else {
            routeNavigator.user().login()
        }
    }

    logout() : Promise<Boolean> {
        return new Promise<Boolean> ( (resolve) => {
            if(dataManager.hasSession()) {
                dataManager.clearSession()
            }
            resolve(true);
            routeNavigator.user().login()
        })
    }
}

const userManager : UserManager = new UserManagerImpl();

export default userManager

