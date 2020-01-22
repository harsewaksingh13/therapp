import {LoginRequest} from '../models'

export interface RegisterRequest extends LoginRequest  {
    firstName : string
    lastName : string
}