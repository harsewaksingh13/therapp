import {ApiRequest} from "../models";

//define create order parameters
interface OrderRequest {

}


export interface OrderApi {
    /**
     * new order
     * */
    order(orderRequest: OrderRequest): ApiRequest

    order(id: string): ApiRequest

    updateOrder(): ApiRequest

    deleteOrder(id: string): ApiRequest

    orders(): ApiRequest
}