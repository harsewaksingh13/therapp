import {History} from "history";
import history from './history';
import {UserNavigator, UserNavigation} from "./userNavigator";
import {OrderNavigator} from "./orderNavigator";

interface Navigator {
    user() : UserNavigator
    order() : OrderNavigator
}


class NavigatorImpl implements Navigator {

    userNavigator : UserNavigator;

    history : History;

    constructor(history: History) {
        this.history = history;
        this.userNavigator = new UserNavigation(history)
    }


    user(): UserNavigator {
        return this.userNavigator
    }

    order(): OrderNavigator {
        throw new Error("Method not implemented.");
    }
}

const routeNavigator: Navigator = new NavigatorImpl(history)

export default routeNavigator