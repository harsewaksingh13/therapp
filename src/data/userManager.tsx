import {LoginRequest} from '../api/models'
import {RegisterRequest} from '../api/models'
import apiManager from '../api/apiManager'
import {AuthResponse} from "../api/models/user/authResponse";
import {User} from "./models/user";
import dataManager from "./dataManager";
import appNavigator from '../view/navigation/appNavigator'


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
            apiManager.user().login(loginRequest).response<ApiAuthResponse>().then(res => {
                let response = res.data
                let authResponse : AuthResponse = {token:response.token,email:response.user.username,userId:response.user.user_id}
                this.resolveUser(authResponse,resolve)
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
        dataManager.session(response.email, response.userId, response.token);
        //todo: handle api response
        let user: User = {firstName: "Harsewak", lastName: "Singh", email: "hsingh@gmail.com"}
        resolve(user)
    };

    welcome() : void {
        if(dataManager.hasSession()){
            appNavigator.user().home()
        } else {
            appNavigator.user().login()
        }
    }

    logout() : Promise<Boolean> {
        return new Promise<Boolean> ( (resolve,rejects) => {
            if(dataManager.hasSession()) {
                dataManager.clearSession()
            }
            resolve(true)
            appNavigator.user().login()
        })
    }
}

const userManager : UserManager = new UserManagerImpl()

export default userManager

