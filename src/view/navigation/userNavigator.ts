import {History} from "history";
import {AppRoute} from "./appRoute";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import {BaseRouteNavigator, RouteNavigator} from "./routeNavigator";

export interface UserNavigator extends RouteNavigator {
    login(): void
    register(): void
    home(): void
}

export class UserNavigation extends BaseRouteNavigator implements UserNavigator {


    appRoutes(): Array<AppRoute> {
        return [{
            key: "login",
            path: "/login",
            component: Login
        },{
            key: "register",
            path: "/register",
            component: Register
        },{
            key: "home",
            path: "/home",
            component: Home
        }];
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
