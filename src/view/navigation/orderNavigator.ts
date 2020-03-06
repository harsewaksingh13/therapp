import {AppRoute} from "./appRoute";
import {BaseRouteNavigator, RouteNavigator} from "./routeNavigator";

export interface OrderNavigator extends RouteNavigator {
    orderDetails(id: string): void
    orders(): void
}

export class OrderNavigation extends BaseRouteNavigator implements OrderNavigator {

    appRoutes(): Array<AppRoute> {
        return [];
    }

    orderDetails(id: string): void {
    }

    orders(): void {
    }

}