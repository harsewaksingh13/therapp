import {LoginRequest} from '../index'

export interface RegisterRequest extends LoginRequest  {
    firstName : string
    lastName : string
}