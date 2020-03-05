import {LoginRequest} from '../api/models'
import {RegisterRequest} from '../api/models'
import apiManager from '../api/apiManager'
import {AuthResponse} from '../api/models/user/authResponse'
import {User} from "./models/user";
import dataManager from "./dataManager";
import navigator from "../view/navigation/appNavigator";

export interface UserManager {
    //display welcome page or handle redirection logic depending session
    welcome() : void
    login(loginRequest: LoginRequest) : Promise<User>
    register(registerRequest: RegisterRequest) : Promise<User>
    logout() : Promise<Boolean>
}

type ApiAuthResponse = {
    token : string
    user: UserResponse
}

type UserResponse = {
    user_id : string
    username: string
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
        dataManager.session({token:response.accessToken,userId:response.user._id,email:response.user.email});
        resolve(response.user)
    };

    welcome() : void {
        if(dataManager.hasSession()){
            navigator.user().home()
        } else {
            navigator.user().login()
        }
    }

    logout() : Promise<Boolean> {
        return new Promise<Boolean> ( (resolve) => {
            if(dataManager.hasSession()) {
                dataManager.clearSession()
            }
            resolve(true);
            navigator.user().login()
        })
    }
}

const userManager : UserManager = new UserManagerImpl();

export default userManager

