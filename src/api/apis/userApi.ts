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
        return this.apiClient.post("/tokens", {"username": request.email, "user_password": request.password})
    }

    logout(): ApiRequest {
        return this.apiClient.delete("tokens")
    }

    register(request: RegisterRequest): ApiRequest {
        return this.apiClient.post("/register", request)
    }
}