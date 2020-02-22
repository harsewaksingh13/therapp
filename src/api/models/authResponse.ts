
export interface AuthResponse extends AccessToken {
    user: UserResponse
}

interface AccessToken  {
    accessToken: string
    refreshToken: string
}

type UserResponse = {
    _id : string
    alias: string
    email: string
}