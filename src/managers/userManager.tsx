import {LoginRequest} from '../models'
import {RegisterRequest} from '../models'
import apiManager from './apiManager'
import routeNavigator from '../routes/routeNavigator'
import {AuthResponse} from "../models/authResponse";
import {User} from "../models/user";
import dataManager from "./dataManager";


export interface UserManager {
    //display welcome page or handle redirection logic depending session
    welcome() : void
    login(loginRequest: LoginRequest) : Promise<User>
    register(registerRequest: RegisterRequest) : Promise<User>
}


class UserManagerImpl implements UserManager {

    login(loginRequest: LoginRequest): Promise<User> {
        return new Promise<User>( (resolve,rejects) => {
            apiManager.login(loginRequest).responseHandler<AuthResponse>().then(response => {
                this.resolveUser(response,resolve)
            }).catch(rejects)
        })
    }

    register(registerRequest: RegisterRequest) : Promise<User> {
        return new Promise<User>( (resolve,rejects) => {
            apiManager.register(registerRequest).responseHandler<AuthResponse>().then(response => {
               this.resolveUser(response,resolve)
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
            routeNavigator.medicines()
        } else {
            routeNavigator.login()
        }
    }
}

const userManager : UserManager = new UserManagerImpl()

export default userManager

