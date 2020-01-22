import { LoginRequest, RegisterRequest } from "../models"

//a service request being processed
interface ServiceRequest {
    cancel() : void
}
//any date request to send to api
export interface DataRequest {
    asParameters() : Map<String,String>
}

interface ServiceManager {
    login(request: LoginRequest) : ServiceRequest
    register(request: RegisterRequest) : ServiceRequest

    //Medicine/Remedy
    createMedicine() : ServiceRequest
    readMedicine() : ServiceRequest
    updateMedicine() : ServiceRequest
    deleteMedicine() : ServiceRequest
    readMedicines() : ServiceRequest

    //Orders/Repeats
    createOrder() : ServiceRequest
    readOrder() : ServiceRequest
    updateOrder() : ServiceRequest
    deleteOrder() : ServiceRequest
    readOrders() : ServiceRequest
}


class ServiceManagerImpl implements ServiceManager {
    


    readMedicines(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    
    login(request: LoginRequest): ServiceRequest {
        throw new Error("Method not implemented.")
    }   
    
    register(request: RegisterRequest): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    createMedicine(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    readMedicine(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    updateMedicine(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    deleteMedicine(): ServiceRequest {
        throw new Error("Method not implemented.")
    }

    createOrder(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    readOrder(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    updateOrder(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    deleteOrder(): ServiceRequest {
        throw new Error("Method not implemented.")
    }
    readOrders(): ServiceRequest {
        throw new Error("Method not implemented.")
    }

}

const serviceManager : ServiceManager = new ServiceManagerImpl()

export default serviceManager