import {ApiRequest, LoginRequest, RegisterRequest} from "../models";
import {ApiClient} from "../apiClient";

export interface UserApi {
    login(request: LoginRequest) : ApiRequest
    register(request: RegisterRequest) : ApiRequest
    logout() : ApiRequest
}

export class UserApiManager implements  UserApi {

    apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    login(request: LoginRequest): ApiRequest {
        return  this.apiClient.query({query:"mutation loginMutation($input: UserInput) {\n" +
                "  authenticateUser(input: $input) {\n" +
                "    accessToken\n" +
                "    refreshToken\n" +
                "    user {\n" +
                "        _id\n" +
                "        alias\n" +
                "        email\n" +
                "    }\n" +
                "  }\n" +
                "}",variables:{input: {"email":request.email,"password":request.password}}})
    }

    logout(): ApiRequest {
        return this.apiClient.delete("tokens")
    }

    register(request: RegisterRequest): ApiRequest {
        return this.apiClient.post("/register", request)
    }
}