import {ApiRequest, LoginRequest, RegisterRequest} from "../models";
import {ApiClient} from "../apiClient";

export type Message = {
    text: string
}

export interface UserApi {
    login(request: LoginRequest): ApiRequest

    register(request: RegisterRequest): ApiRequest

    logout(): ApiRequest

    messages(): ApiRequest

    messagesBy(userId: string): ApiRequest
}

export class UserApiManager implements UserApi {

    apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    login(request: LoginRequest): ApiRequest {
        return this.apiClient.query({
            query: "mutation loginMutation($input: UserInput) {\n" +
                "  authenticateUser(input: $input) {\n" +
                "    accessToken\n" +
                "    refreshToken\n" +
                "    user {\n" +
                "        _id\n" +
                "        alias\n" +
                "        email\n" +
                "        fname" +
                "        lname"+
                "    }\n" +
                "  }\n" +
                "}", variables: {input: {"email": request.email, "password": request.password}}
        })
    }

    logout(): ApiRequest {
        return this.apiClient.query({query: ""})
    }

    register(request: RegisterRequest): ApiRequest {
        return this.apiClient.query({query: ""})
    }

    messageQuery = "  _id text createdAt creator{ _id email } receiver { _id email }";

    messages(): ApiRequest {
        return this.apiClient.subscription({
            query: "subscription { createMessage { " + this.messageQuery + " } }"
            , variables: {}
        })
    }

    messagesBy(userId: string): ApiRequest {
        return this.apiClient.query({
            query: "{ messages(relatedId:" + userId + "){ " + this.messageQuery + " } }"
        })
    }
}