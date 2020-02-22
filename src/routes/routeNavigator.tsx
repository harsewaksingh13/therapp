import {History} from "history";
import history from './history';

interface Navigator {
    user() : UserNavigator
    order() : OrderNavigator
}



interface UserNavigator {
    login(): void
    register(): void
    home(): void
}

interface OrderNavigator {
    orderDetails(id: string): void
    orders(): void
}

class UserNavigatorImpl implements UserNavigator {
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

}

class NavigatorImpl implements Navigator {

    userNavigator : UserNavigator;

    history : History;

    constructor(history: History) {
        this.history = history;
        this.userNavigator = new UserNavigatorImpl(history)
    }


    user(): UserNavigator {
        return this.userNavigator
    }

    order(): OrderNavigator {
        throw new Error("Method not implemented.");
    }

}

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



const routeNavigator: Navigator = new NavigatorImpl(history)

export default routeNavigator