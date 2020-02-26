interface DataManager {
    session(email: string, id: string, token: string): void

    hasSession(): boolean

    clearSession() : void

    saveObj<T extends Object>(obj: T): void

    save<T>(key: string, obj: T): void

    read<T>(key: string): T | null
}

class DataManagerHandler implements DataManager {

    session(email: string, id: string, token: string): void {
        localStorage.setItem("Email", email);
        localStorage.setItem("UserId", id);
        localStorage.setItem("Token", token)
    }

    hasSession(): boolean {
        let token = localStorage.getItem("Token");
        return token !== null && token.length > 0
    }

    clearSession() : void {
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
}

const dataManager: DataManager = new DataManagerHandler();

export default dataManager