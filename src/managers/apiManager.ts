import { LoginRequest, RegisterRequest } from "../models"
import apiClient, {ApiClient, ApiRequest} from "./apiClient";


//any date request to send to api
export interface DataRequest {
    asParameters() : Map<String,String>
}

interface ApiManager {
    login(request: LoginRequest) : ApiRequest
    register(request: RegisterRequest) : ApiRequest

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
        return apiClient.post("/login", request)
    }   
    
    register(request: RegisterRequest): ApiRequest {
        return apiClient.post("/register", request)
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