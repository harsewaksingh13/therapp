import {Request} from "../base/request";

export interface Subscriber<T> {
    update(res : T) : void
}

export interface Subscription {
    unsubscribe() : void
}

export interface ApiRequest extends Request {
    /***
     *  subscribe to real-time updates
     *  */
    subscribe<T>(subscriber: Subscriber<T>): Subscription

    /**
     * Response is exact as T
     * */
    response<T>(): Promise<T>
}