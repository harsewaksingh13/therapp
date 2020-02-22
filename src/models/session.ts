import {User} from "./user";

export type Session = {
    token : string
    user?: User
}

const user = {
    token : "",
    user : {
        firstName : '',
        email: '',
        orders : [{
            orderId: "",
            orderDate:'',
            state:'initiated | placed | processed | ready_collection | ready_delivery | collected | delivered | cancelled',
            items: [{
                id:'',
                name:'',
            }]
        }],
        items: [{
            id:'',
            name:'',
            type:'service | product'
        }]
    }
};