import * as rm from 'typed-rest-client'
import {HttpClient} from "typed-rest-client/HttpClient";
import {ApiError, AppError} from "./models/apiError";

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {gql} from "apollo-boost";


export interface Response<T, E extends Error> {
    data: T
    error?: E;
}

export interface ApiResponse<T> extends Response <T, ApiError> {
    error?: ApiError
}

export interface ApiRequest {
    cancel(): void

    response<T>(): Promise<Response<T, Error>>

}

export interface GraphRequest<V> {
    query: string
    variables?: V
}

export interface GraphClient {
    query<V>(request: GraphRequest<V>, headers?: Map<string, any> | null): ApiRequest
}


class ApolloGraphClient implements ApiClient {

    httpLink = new HttpLink({
        uri: "http://localhost:8000/graphql",
        headers: {
            "x-token": localStorage.getItem("token")
        },
    });

    client = new ApolloClient({
        link: this.httpLink,
        cache: new InMemoryCache()
    });

    query<V>(request: GraphRequest<V>, headers?: Map<string, any> | null): ApiRequest {
        return new ApiGraphRequestHandler(this.client, request)
    }
}

//C is cache, V is variable type
class ApiGraphRequestHandler<C, V> implements ApiRequest {
    client: ApolloClient<C>;
    request: GraphRequest<V>;

    constructor(client: ApolloClient<C>, request: GraphRequest<V>,) {
        this.client = client;
        this.request = request
    }

    cancel(): void {

    }

    response<T>(): Promise<Response<T, Error>> {
        return this.apiResponseHandler()
    }

    async apiResponseHandler<T>(): Promise<ApiResponse<T>> {
        let gqlNode = gql(this.request.query);
        console.log("query " + this.request.query)
        console.log("variables " + JSON.stringify(this.request.variables))
        await this.client.clearStore()
        let response: ApiResponse<T>;
        if (this.request.query.includes("mutation")) {
            console.log("mutation")
            let result = await this.client.mutate({
                mutation: gqlNode,
                variables: this.request.variables
            });
            console.log("result " + JSON.stringify(result));

            let errors = result.errors
            console.log("errors " + errors)
            let error
            if (errors) {
// let apiError : ApiError = {code:errors[0]}
                error = {message: errors[0].message, code: errors[0].name, name: "", text: ""}
            } else {
                let data = result.data
                let firstKey = Object.keys(data!)[0];
                result.data = result.data![firstKey]
                let apiResponse: ApiResponse<T> = {data: result.data, error: error}
                console.log("result data" + JSON.stringify(result));
                response = apiResponse
            }
        } else {
            let result = await this.client.query<ApiResponse<T>>({query: gqlNode, variables: this.request.variables});

            response = result.data

        }
        console.log("before promise")
        return new Promise<ApiResponse<T>>((resolver, reject) => {
            console.log("in promise response " + JSON.stringify(response));
            if (response.error === undefined || response.error === null) {
                console.log("no api error");
                resolver(response)
            } else {
                //api returned error
                console.log("data is null reject with error" + JSON.stringify(response.error));
                reject(response.error)
            }
        })
    }


}


export interface ApiClient extends GraphClient {
    // post(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest
    //
    // get(url: string, parameters?: any | null, headers?: Map<string, any> | null): ApiRequest
    //
    // delete(url: string, parameters?: any | null, headers?: Map<string, any> | null): ApiRequest
}

class RestApiClient implements ApiClient {

    rest: rm.RestClient = new rm.RestClient("webapp", "http://localhost:8000/graphql");

    get(url: string, parameters?: any | null, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'get', headers, parameters)
    }

    post(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'post', headers, parameters)
    }

    delete(url: string, parameters: any | null, headers?: Map<string, any> | null): ApiRequest {
        return this.request(url, 'delete', headers, parameters)
    }

    query<V>(request: GraphRequest<V>, headers?: Map<string, any> | null): ApiRequest {
        return new ApiRequestHandler(this.rest, "", "post", headers,
            request)
    }

    private request(url: string, method: string, headers?: Map<string, string> | null, parameters?: Map<string, string> | null): ApiRequest {
        return new ApiRequestHandler(this.rest, url, method, headers, parameters)
    }
}


class ApiRequestHandler implements ApiRequest {
    private httpClient: HttpClient;
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

    async apiResponseHandler<T>(): Promise<ApiResponse<T>> {
        if (this.method === "post") {
            let options = this.requestOptions();
            console.log("request options " + JSON.stringify(options));
            console.log("request body " + JSON.stringify(this.parameters));
            let response = await this.rest.create<ApiResponse<T>>(this.url, this.parameters, options);
            return this.validateApiResponse(response)
        } else if (this.method === "delete") {
            let response = await this.rest.del<ApiResponse<T>>(this.url);
            return this.validateApiResponse(response)
        } else {//if(this.method === "get")
            let response = await this.rest.get<ApiResponse<T>>(this.url);
            return this.validateApiResponse(response)
        }
    }

    private validateApiResponse<T>(response: rm.IRestResponse<ApiResponse<T>>): Promise<ApiResponse<T>> {
        return new Promise<ApiResponse<T>>((resolver, reject) => {
            console.log("response " + JSON.stringify(response));
            //todo: handle statusCode : 200 or other
            if (response.result === null) {
                let error: AppError = {name: "", message: "Null response returned"};
                reject(error)
            } else {
                console.log("result " + JSON.stringify(response.result));
                if (response.result.error === undefined || response.result.error === null) {
                    console.log("result data not null resolve with result");
                    resolver(response.result)
                } else {
                    //api returned error
                    console.log("result data is null reject with error" + JSON.stringify(response.result.error));
                    reject(response.result.error)
                }
            }
        })
    }

    async response<T>(): Promise<Response<T, Error>> {
        return this.apiResponseHandler<T>()
    }

}


const apiClient: ApiClient = new ApolloGraphClient();

export default apiClient