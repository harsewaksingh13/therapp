import {Session} from "./models/session";

interface DataManager {
    session(session: Session): void

    readSession() : Session

    hasSession(): boolean

    clearSession(): void

    saveObj<T extends Object>(obj: T): void

    save<T>(key: string, obj: T): void

    read<T>(key: string): T | null

    /***
     *  read the saved object for key, provide initial value to return if object don't exist
     *  */
    readObject<T>(key: string, initial: T): T
}

class DataManagerHandler implements DataManager {

    session(session: Session): void {
        localStorage.setItem("Email", session.email)
        localStorage.setItem("UserId", session.userId)
        localStorage.setItem("Token", session.token)
    }

    readSession() : Session {
       return {email: this.getItem("Email") || "", token: this.getItem("Token") || "", userId: this.getItem("UserId") || ""}
    }

    private getItem(key: string) : string | null {
        return localStorage.getItem(key)
    }

    hasSession(): boolean {
        let token = localStorage.getItem("Token");
        return token !== null && token.length > 0
    }

    clearSession(): void {
        localStorage.clear()
    }

    saveObj<T extends Object>(obj: T): void {
        this.save(obj.constructor.name, obj)
    }

    save<T>(key: string, obj: T): void {
        localStorage.setItem(key, JSON.stringify(obj))
    }

    read<T>(key: string): T | null {
        let item = localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item)
        }
        return null
    }

    readObject<T>(key: string, initial: T): T {
        let obj = this.read<T>(key)
        if (obj) {
            return obj
        } else {
            return initial
        }
    }
}

const dataManager: DataManager = new DataManagerHandler();

export default dataManager