import {ApiRequest, AppError, Subscriber} from "./models";

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

    subscription<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest
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
        cache: new InMemoryCache(),
        typeDefs: ""
    });

    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest {
        return new ApiGraphRequestHandler(this.client, request)
    }

    subscription<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest {
        return new ApiGraphRequestHandler(this.client, request)
    }
}

//C is cache, V is variable type
class ApiGraphRequestHandler<C, V> implements ApiRequest {
    client: ApolloClient<C>;
    parameters: GraphParameters<V>;

    constructor(client: ApolloClient<C>, request: GraphParameters<V>,) {
        this.client = client;
        this.parameters = request
    }

    cancel(): void {
    }

    async responseHandler<T>(): Promise<T> {
        let gqlNode = gql(this.parameters.query);
        if (this.parameters.query.includes("mutation")) {
            console.log("mutation " + this.parameters.query);
            try {
                let result = await this.client.mutate({
                    mutation: gqlNode,
                    variables: this.parameters.variables,
                });
                console.log("result" + JSON.stringify(result));
                return this.validateResponse<T>(this.filterResult(result))
            } catch (graphqlErrors) {
                throw graphqlErrors.graphQLErrors[0]
            }

        } else {
            console.log("query " + this.parameters.query);
            let result = await this.client.query<T>({query: gqlNode, variables: this.parameters.variables});
            return this.validateResponse<T>(result.data)
        }

    }

    private filterResult<T>(result: any): T | null {
        if (result.data) {
            let firstKey = Object.keys(result.data)[0];
            result = result.data[firstKey];
            result = {data: result};
            console.log("result data" + JSON.stringify(result));
            return result.data
        }
        return null
    }

    private validateResponse<T>(response: T | undefined | null): Promise<T> {
        return new Promise<T>((resolver, reject) => {
            console.log("Response => " + JSON.stringify(response));
            if (response) {
                resolver(response)
            } else {
                let error: AppError = {name: "", message: "Null response returned"};
                reject(error)
            }
        })
    }

    response<T>(): Promise<T> {
        return this.responseHandler<T>()
    }

    subscribe<T>(subscriber: Subscriber<T>): void {
        let gqlNode = gql(this.parameters.query);
        this.client.subscribe({query: gqlNode, variables: this.parameters.variables}).subscribe(result => {
            let response = this.filterResult<T>(result.data);
            if (response) {
                subscriber.update(response)
            }
        })
    }
}

const apiClient: ApiClient = new ApolloGraphClient();

export default apiClient