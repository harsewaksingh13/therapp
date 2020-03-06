export type User = {
    firstName : string
    lastName : string
    email : string
}

export enum UserAction {
    Login = 'login',
    Register = 'register',
    Logout = 'logout',
    UpdateProfile = 'updateProfile',
}