import {UserResponse} from "./userResponse";

export interface AuthResponse extends AuthToken {
    user : UserResponse
}

export type AuthToken = {
    accessToken : string
    refreshToken : string
}