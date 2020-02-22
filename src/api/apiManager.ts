import { LoginRequest, RegisterRequest } from "./models"
import apiClient, {ApiClient, ApiRequest} from "./apiClient";


interface ApiManager {
    login(request: LoginRequest) : ApiRequest
    register(request: RegisterRequest) : ApiRequest
    logout() : ApiRequest

    //Medicine/Remedy
    createMedicine() : ApiRequest
    readMedicine() : ApiRequest
    updateMedicine() : ApiRequest
    deleteMedicine() : ApiRequest
    readMedicines() : ApiRequest

    //Orders/Repeats
    createOrder() : ApiRequest
    readOrder() : ApiRequest
    updateOrder() : ApiRequest
    deleteOrder() : ApiRequest
    readOrders() : ApiRequest
}


class ServiceManagerImpl implements ApiManager {
    
    apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    readMedicines(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    
    login(request: LoginRequest): ApiRequest {
        return apiClient.query({query:"mutation loginMutation($input: UserInput) {\n" +
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
        // return apiClient.post("", {"username":request.email,"user_password":request.password})
    }   

    logout() : ApiRequest {
        return apiClient.query({query:"",variables:""})
    }
    
    register(request: RegisterRequest): ApiRequest {
        return apiClient.query({query:""})
    }
    createMedicine(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    readMedicine(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    updateMedicine(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    deleteMedicine(): ApiRequest {
        throw new Error("Method not implemented.")
    }

    createOrder(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    readOrder(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    updateOrder(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    deleteOrder(): ApiRequest {
        throw new Error("Method not implemented.")
    }
    readOrders(): ApiRequest {
        throw new Error("Method not implemented.")
    }

}

const apiManager : ApiManager = new ServiceManagerImpl(apiClient)

export default apiManager