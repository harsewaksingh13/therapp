import {Response} from "../base/response";
import {ApiError} from "./apiError";

export interface ApiResponse<T> extends Response <T> {
    errors? : [ApiError]
    data : T
}