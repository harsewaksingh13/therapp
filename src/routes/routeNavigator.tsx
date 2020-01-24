import {History} from "history";
import history from './history';

interface RouteNavigator {
    login(): void
    register(): void

    home(): void

    medicineDetails(id: string): void
    medicines(): void

    orderDetails(id: string): void
    orders(): void

}

class RouteManager implements RouteNavigator {

    history : History

    constructor(history: History) {
        this.history = history
    }

    login(): void {
        this.history.push("/login")
    } 
    register(): void {
        this.history.push("/register")
    }

    home(): void {
        this.history.push("/home")
    }

    medicineDetails(id: string): void {
        throw new Error("Method not implemented.")
    }
    medicines(): void {
        throw new Error("Method not implemented.")
    }


    orderDetails(id: string): void {
        throw new Error("Method not implemented.")
    }
    orders(): void {
        throw new Error("Method not implemented.")
    }

}



const routeNavigator: RouteNavigator = new RouteManager(history)

export default routeNavigator