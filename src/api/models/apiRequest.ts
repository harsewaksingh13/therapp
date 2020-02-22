import {Request} from "../base/request";
import {Response} from "../base/response";

export interface ApiRequest extends Request {
    response<T>() : Promise<Response<T>>
    responseExact<T>() : Promise<T>
}