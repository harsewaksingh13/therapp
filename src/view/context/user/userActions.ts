import {LoginRequest, RegisterRequest} from "../../../api/models";

export type UserActions = {
    login(loginRequest : LoginRequest) : void
    logout() : void
    register(registerRequest: RegisterRequest) : void
}