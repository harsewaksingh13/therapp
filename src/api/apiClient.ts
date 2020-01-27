import * as rm from 'typed-rest-client'
import {HttpClient} from "typed-rest-client/HttpClient";
import {ApiError, AppError} from "./models/apiError";


export interface Response<T,E extends Error> {
    data : T
    error? : E;
}

export interface ApiResponse<T> extends Response <T, ApiError> {
    error? : ApiError
    data : T
}

export interface ApiRequest {
    cancel() : void
    response<T>() : Promise<Response<T,Error>>
}

export interface ApiClient {
    post(url: string,  parameters:any | null, headers?: Map<string,any> | null) : ApiRequest
    get(url: string,  parameters?:any | null, headers?: Map<string,any> | null) : ApiRequest
    delete(url: string,  parameters?:any | null, headers?: Map<string,any> | null) : ApiRequest
}

class RestApiClient implements ApiClient {

    rest : rm.RestClient = new rm.RestClient("webapp","localhost:3000")

    get(url: string, parameters?:any | null, headers?: Map<string,any> | null): ApiRequest {
        return this.request(url,'get',headers,parameters)
    }

    post(url: string,  parameters:any | null, headers?: Map<string,any> | null): ApiRequest {
        return this.request(url,'post',headers,parameters)
    }

    delete(url: string,  parameters:any | null, headers?: Map<string,any> | null): ApiRequest {
        return this.request(url,'delete',headers,parameters)
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

    
        if(headers === undefined || headers === null){
            this.headers =  {
                "Content-Type": "application/json",
            }
        }
    }
    
    cancel(): void {
        this.httpClient.dispose()
    }


    requestOptions() : rm.IRequestOptions {
        return {additionalHeaders:this.headers}
    }

    async apiResponseHandler<T>(): Promise<ApiResponse<T>> {
        if(this.method === "post") {
            let options = this.requestOptions()
            console.log("request options "+JSON.stringify(options))
            console.log("request body "+JSON.stringify(this.parameters))
            let response = await this.rest.create<ApiResponse<T>>(this.url,this.parameters,options)
            return  this.validateApiResponse(response)
        } else if(this.method === "delete"){
            let response = await this.rest.del<ApiResponse<T>>(this.url)
            return  this.validateApiResponse(response)
        } else  {//if(this.method === "get")
            let response = await this.rest.get<ApiResponse<T>>(this.url)
            return  this.validateApiResponse(response)
        }
    }

    private validateApiResponse<T>(response : rm.IRestResponse<ApiResponse<T>>) : Promise<ApiResponse<T>> {
        return new Promise<ApiResponse<T>>( (resolver, reject) => {
            console.log("response "+JSON.stringify(response))
            //todo: handle statusCode : 200 or other
            if (response.result == null) {
                let error : AppError = {name:"",message:"Null response returned"}
                reject(error)
            } else {
                if (response.result.error === undefined || response.result.error === null) {
                    console.log("result data not null resolve with result")
                    resolver(response.result)
                } else {
                    //api returned error
                    console.log("result data is null reject with error"+JSON.stringify(response.result.error))
                    reject(response.result.error)
                }
            }
        })
    }

   async response<T>(): Promise<Response<T, Error>> {
    return this.apiResponseHandler<T>()
   }

}


const apiClient : ApiClient = new RestApiClient()

export default apiClient