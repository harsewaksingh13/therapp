import {ApiRequest, LoginRequest, RegisterRequest} from "./models"
import apiClient, {ApiClient} from "./apiClient";

interface UserApi {
    login(request: LoginRequest) : ApiRequest
    register(request: RegisterRequest) : ApiRequest
    logout() : ApiRequest
}

interface OrderApi {
    orders() : ApiRequest
    order(id: string) : ApiRequest
}

interface ProductApi {
    products() : ApiRequest
    product(id: string) : ApiRequest
}

interface ApiManager {

    user() : UserApi;
}

class UserApiManager implements UserApi {

    apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    login(request: LoginRequest): ApiRequest {
        return  apiClient.query({query:"mutation loginMutation($input: UserInput) {\n" +
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
        // return apiClient.post("/tokens", {"username":request.email,"user_password":request.password})
    }

    logout() : ApiRequest {
        return apiClient.delete("tokens")
    }

    register(request: RegisterRequest): ApiRequest {
        return apiClient.post("/register", request)
    }
}

class ServiceManagerImpl implements ApiManager {

    userApi : UserApi

    constructor(apiClient: ApiClient) {
        this.userApi = new UserApiManager(apiClient)
    }

    user(): UserApi {
        return this.userApi
    }

}

const apiManager : ApiManager = new ServiceManagerImpl(apiClient)

export default apiManager