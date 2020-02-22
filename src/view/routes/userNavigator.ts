import {History} from "history";

export interface UserNavigator {
    login(): void
    register(): void
    home(): void
}

export class UserNavigation implements UserNavigator {
    history : History;

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