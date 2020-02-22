import * as rm from 'typed-rest-client'
import {HttpClient} from "typed-rest-client/HttpClient";
import {AppError} from "./models";
import {ApiRequest} from "./models";
import {Response} from "./base/response";
import {ApiResponse} from "./models";

export interface GraphParameters<V> {
    query: string
    variables?: V
}

export interface ApiClient {
    post(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest

    get(url: string, headers?: Map<string, any> | null): ApiRequest

    delete(url: string, parameters?: any | null, headers?: Map<string, any> | null): ApiRequest

    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest
}

class RestApiClient implements ApiClient {

    rest: rm.RestClient = new rm.RestClient("webapp", "http://localhost:8000/");

    get(url: string, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'get', headers)
    }

    post(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'post', headers, parameters)
    }

    delete(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'delete', headers, parameters)
    }

    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest {
        return this.post("graphql",request,headers)
    }

    private request(url: string, method: string, headers?: Map<string, string> | null, parameters?: Map<string, string> | null): ApiRequest {
        return new ApiRequestHandler(this.rest, url, method, headers, parameters)
    }
}


class ApiRequestHandler implements ApiRequest {
    private readonly httpClient: HttpClient;
    rest: rm.RestClient;
    method: string;
    headers?: any;
    parameters?: any;
    url: string;

    constructor(rest: rm.RestClient, url: string, method: string, headers?: any, parameters?: any) {
        this.url = url;
        this.method = method;
        this.rest = rest;
        this.httpClient = rest.client;
        this.headers = headers;
        this.parameters = parameters;


        if (headers === undefined || headers === null) {
            this.headers = {
                "Content-Type": "application/json",
            }
        }
    }

    cancel(): void {
        this.httpClient.dispose()
    }


    requestOptions(): rm.IRequestOptions {
        return {additionalHeaders: this.headers}
    }

    async responseHandler<T>(): Promise<T> {
        let options = this.requestOptions();
        console.log("Url => " + JSON.stringify(this.url));
        console.log("Method => " + JSON.stringify(this.method));
        console.log("Header => " + JSON.stringify(options));
        if (this.method === "post") {
            console.log("Body => " + JSON.stringify(this.parameters));
            let response = await this.rest.create<T>(this.url, this.parameters, options);
            return this.validateResponse(response)
        } else if (this.method === "delete") {
            let response = await this.rest.del<T>(this.url, options);
            return this.validateResponse(response)
        } else {//if(this.method === "get")
            let response = await this.rest.get<T>(this.url,options);
            return this.validateResponse(response)
        }
    }

    private validateResponse<T>(response: rm.IRestResponse<T>): Promise<T> {
        return new Promise<T>((resolver, reject) => {
            console.log("Response => " + JSON.stringify(response));
            //todo: handle statusCode : 200 or other
            if (response.result === null) {
                let error: AppError = {name: "", message: "Null response returned"};
                reject(error)
            } else {
                resolver(response.result)
            }
        })
    }

    async apiResponseHandler<T>(): Promise<ApiResponse<T>> {
        let response = await this.responseHandler<ApiResponse<T>>();
        return this.validateApiResponse(response)
    }

    private validateApiResponse<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
        return new Promise<ApiResponse<T>>((resolver, reject) => {
            if (response.errors === undefined || response.errors === null) {
                resolver(response)
            } else {
                reject(response.errors[0])
            }
        })
    }

    async response<T>(): Promise<Response<T>> {
        return this.apiResponseHandler<T>()
    }

    responseExact<T>(): Promise<T> {
        return this.responseHandler()
    }
}


const apiClient: ApiClient = new RestApiClient();

export default apiClient