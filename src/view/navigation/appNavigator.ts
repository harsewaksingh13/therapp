import {History} from "history";
import history from './history';
import {UserNavigation, UserNavigator} from "./userNavigator";
import {AppRoute} from "./appRoute";
import {OrderNavigation, OrderNavigator} from "./orderNavigator";
import {RouteNavigator} from "./routeNavigator";



export interface AppNavigator extends RouteNavigator {
    user() : UserNavigator
    order() : OrderNavigator
}


class AppNavigation implements AppNavigator {

    userNavigator : UserNavigator;
    orderNavigator : OrderNavigator;

    constructor(history: History) {
        this.userNavigator = new UserNavigation(history);
        this.orderNavigator = new OrderNavigation(history)
    }


    user(): UserNavigator {
        return this.userNavigator
    }

    order(): OrderNavigator {
        return this.orderNavigator
    }

    appRoutes(): Array<AppRoute> {
        //every navigator added to navigation should concat the routes
        return this.userNavigator.appRoutes().concat(this.orderNavigator.appRoutes())
    }
}

const navigator: AppNavigator = new AppNavigation(history);

export default navigator