import {UserAction} from "./user";

const actions = {
    user: UserAction
};


export interface Action<T,P> {
    type : T
    payload : P
}


export default actions
