import * as rm from 'typed-rest-client'
import {HttpClient} from "typed-rest-client/HttpClient";
import {ApiError} from "../models/apiError";


export interface Response<T,E extends Error> {

    data() : T;

    error() : E;
}

export interface ApiResponse<T> {
    error? : Error
    data : T
}

export interface ApiRequest {
    cancel() : void
    apiResponseHandler<T>() : Promise<ApiResponse<T>>
    responseHandler<T>() : Promise<T>
    response<T>() : Promise<Response<T,Error>>
}

export interface ApiClient {
    post(url: string,  parameters:any | null, headers?: Map<string,any> | null) : ApiRequest
    get(url: string,  parameters?:any | null, headers?: Map<string,any> | null) : ApiRequest
}

class RestApiClient implements ApiClient {

    rest : rm.RestClient = new rm.RestClient("webapp","localhost:3000")

    get(url: string, parameters?:any | null, headers?: Map<string,any> | null): ApiRequest {
        return this.request(url,'get',headers,parameters)
    }

    post(url: string,  parameters:any | null, headers?: Map<string,any> | null): ApiRequest {
        return this.request(url,'post',headers,parameters)
    }

    private request(url: string, method: string, headers?: Map<string, string> | null, parameters?: Map<string, string> | null) : ApiRequest {
        return new ApiRequestHandler(this.rest,url,method,headers,parameters)
    }
}


class ApiRequestHandler implements ApiRequest {
    private httpClient: HttpClient;
    rest : rm.RestClient
    method: string
    headers?: any
    parameters? : any
    url:string
    constructor(rest : rm.RestClient,url:string,method: string, headers?: any, parameters?:any) {
        this.url = url
        this.method = method
        this.rest = rest
        this.httpClient = rest.client
        this.headers = headers
        this.parameters = parameters
    }
    cancel(): void {
        this.httpClient.dispose()
    }

    async apiResponseHandler<T>(): Promise<ApiResponse<T>> {
        if(this.method == "post") {
            let response = await this.rest.create<ApiResponse<T>>(this.url,this.parameters)
            return  new Promise<ApiResponse<T>>( (resolver, reject) => {
                if (response.result == null) {
                    let error : ApiError = {name:"",message:"Null response returned"}
                    reject(error)
                } else {
                    resolver(response.result)
                }
            })
        } else {
            let response = await this.rest.get<ApiResponse<T>>(this.url)
            return  new Promise<ApiResponse<T>>( (resolver, reject) => {
                if (response.result == null) {
                    let error : ApiError = {name:"",message:"Null response returned"}
                    reject(error)
                } else {
                    resolver(response.result)
                }
            })
        }

    }

   async responseHandler<T>(): Promise<T> {
        let response = await this.rest.get<T>(this.url)
       return  new Promise<T>( (resolver, reject) => {
           if (response.result == null) {
               let error : ApiError = {name:"",message:"Null response returned"}
               reject(error)
           } else {
               resolver(response.result)
           }
       })
   }

   async response<T>(): Promise<Response<T, Error>> {
       let response = await this.rest.get<Response<T, Error>>(this.url)
       return  new Promise<Response<T, Error>>( (resolver, reject) => {
           if (response.result == null) {
               let error : ApiError = {name:"",message:"Null response returned"}
               reject(error)
           } else {
               resolver(response.result)
           }
       })
   }
}


const apiClient : ApiClient = new RestApiClient()

export default apiClient