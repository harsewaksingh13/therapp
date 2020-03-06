import * as rm from 'typed-rest-client'
import {HttpClient} from "typed-rest-client/HttpClient";
import {AppError} from "./models";
import {ApiRequest} from "./models";
import {Response} from "./base/response";
import {ApiResponse} from "./models";
import {ApiError, AppError} from "./models/apiError";

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {gql} from "apollo-boost";


export interface GraphParameters<V> {
    query: string
    variables?: V
}

export interface ApiClient {
    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest
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

    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest {
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


    responseExact<T>(): Promise<T> {
        return this.responseHandler()
    }
}

const apiClient: ApiClient = new ApolloGraphClient();

export default apiClient