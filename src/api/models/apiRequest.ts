import {Request} from "../base/request";
import {Response} from "../base/response";

export interface Subscriber<T> {
    update(res : T) : void
}

export interface ApiRequest extends Request {
    /***
     *  subscribe to real-time updates
     *  */
    subscribe<T>(subscriber: Subscriber<T>): void

    /**
     * Response is exact as T
     * */
    response<T>(): Promise<T>
}