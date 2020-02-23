import {UserResponse} from "../../api/models/userResponse";

export type User = {
    firstName : string
    lastName : string
    email : string
}

export function toUser(userResponse: UserResponse) : User {
    return {firstName: userResponse.email, lastName:userResponse.email,email:userResponse.email}
}