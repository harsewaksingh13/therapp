import {ApiRequest, AppError, Subscriber, Subscription} from "./models";
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {gql} from "apollo-boost";
import {WebSocketLink} from "apollo-link-ws";


export interface GraphParameters<V> {
    query: string
    variables?: V
}

export interface ApiClient {
    query<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest

    subscription<V>(request: GraphParameters<V>, headers?: Map<string, any> | null): ApiRequest
}

const host = "http://localhost:9000";

class ApolloGraphClient implements ApiClient {

    httpLink = new HttpLink({
        uri: `${host}/graphql`,
        headers: {
            "x-token": localStorage.getItem("token")
        },
    });


    wsLink = new WebSocketLink({
        uri: `ws://localhost:9000/graphql`,
        options: {
            reconnect: true
        }
    });

    // using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
    link = split(
        // split based on operation type
        ({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        this.wsLink,
        this.httpLink,
    );

    client = new ApolloClient({
        link: this.link,
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

    private filterResult = <T>(result: any): T | null => {
        if (result) {
            console.log("Response Result => " + JSON.stringify(result));
            if (result.data) {
                let firstKey = Object.keys(result.data)[0];
                result = result.data[firstKey];
                result = {data: result};
                console.log("Response Result Data =>" + JSON.stringify(result));
                return result.data
            }
        }
        return null
    };

    private validateResponse<T>(response: T | undefined | null): Promise<T> {
        return new Promise<T>((resolver, reject) => {
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

    subscribe<T>(subscriber: Subscriber<T>): Subscription {
        let gqlNode = gql(this.parameters.query);
        let subscription = this.client.subscribe({query: gqlNode, variables: this.parameters.variables}).subscribe(result => {
            let response = this.filterResult<T>(result);
            if (response) {
                subscriber.update(response)
            }
        });
        return  {
            unsubscribe(): void {
                subscription.unsubscribe()
            }
        }
    }
}

const apiClient: ApiClient = new ApolloGraphClient();

export default apiClient