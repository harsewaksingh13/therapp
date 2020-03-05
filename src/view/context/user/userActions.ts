import {LoginRequest} from "../../../api/models";

export type UserActions = {
    login(loginRequest : LoginRequest) : void
    logout() : void
}