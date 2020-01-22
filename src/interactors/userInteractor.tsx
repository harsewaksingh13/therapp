import {LoginRequest} from '../models'
import {RegisterRequest} from '../models'
import serviceManager from '../managers/serviceManager'
import routeNavigator from '../routes/routeNavigator'


export interface UserInteractor {
    //display welcome page or handle redirection logic depending session
    welcome() : void
    login(loginRequest: LoginRequest) : void
    register(registerRequest: RegisterRequest) : void
}


class UserInteractorImpl implements UserInteractor {

    login(loginRequest: LoginRequest) {
        serviceManager.login(loginRequest)
    }

    register(registerRequest: RegisterRequest) {
        serviceManager.register(registerRequest)
    }

    welcome() : void {
        routeNavigator.login()
    }
}

const userInteractor : UserInteractor = new UserInteractorImpl()

export default userInteractor

