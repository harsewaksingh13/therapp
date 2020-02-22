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
}