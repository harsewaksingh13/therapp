import {Request} from "../base/request";
import {Response} from "../base/response";

export interface ApiRequest extends Request {
    /***
     *  Response is wrapped in data object
     *  */
    response<T>(): Promise<Response<T>>

    /**
     * Response is exact as T
     * */
    responseExact<T>(): Promise<T>

    /***
     *  subscribe to real-time updates
     *  */
    subscribe<T>(subscriber: Subscriber<T>): Subscription

}


export interface Subscriber<T> {
    update(res : T) : void
}

export interface Subscription {
    unsubscribe() : void
}
