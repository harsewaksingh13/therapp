import {Response} from "../base/response";
import {ApiError} from "./apiError";

export interface ApiResponse<T> extends Response <T> {
    error? : ApiError
    data : T
}