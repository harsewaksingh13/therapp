import { createBrowserHistory } from 'history';

interface RouteNavigator {
    login(): void
    register(): void

    medicineDetails(id: string): void
    medicines(): void

    orderDetails(id: string): void
    orders(): void

}

class RouteManager implements RouteNavigator {
    
    login(): void {
        throw new Error("Method not implemented.")
    } 
    register(): void {
        throw new Error("Method not implemented.")
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



const routeManager: RouteNavigator = new RouteManager()

export default routeManager