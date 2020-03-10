import {LoginRequest, Subscriber, Subscription} from '../api/models'
import {RegisterRequest} from '../api/models'
import apiManager from '../api/apiManager'
import {AuthResponse} from '../api/models/user/authResponse'
import {User} from "./models/user";
import dataManager from "./dataManager";
import navigator from "../view/navigation/appNavigator";
import {Message} from "../api/apis/userApi";

export interface UserManager {
    //display welcome page or handle redirection logic depending session
    welcome(): void

    login(loginRequest: LoginRequest): Promise<User>

    register(registerRequest: RegisterRequest): Promise<User>

    logout(): Promise<Boolean>

    messages(subscriber: Subscriber<Message>): void

    allMessages(): Promise<Array<Message>>
}


class UserManagerImpl implements UserManager {

    private messagesSubscription?: Subscription;

    login(loginRequest: LoginRequest): Promise<User> {
        return new Promise<User>((resolve, rejects) => {
            apiManager.user().login(loginRequest).response<AuthResponse>().then(res => {
                this.resolveUser(res, resolve)
            }).catch(rejects)
        })
    }

    register(registerRequest: RegisterRequest): Promise<User> {
        return new Promise<User>((resolve, rejects) => {
            apiManager.user().register(registerRequest).response<AuthResponse>().then(response => {
                this.resolveUser(response, resolve)
            }).catch(rejects)
        })
    }

    private resolveUser = (response: AuthResponse, resolve: Function) => {
        dataManager.session({token: response.accessToken, userId: response.user._id, email: response.user.email});
        resolve(response.user)
    };

    welcome(): void {
        if (dataManager.hasSession()) {
            navigator.user().home();
            this.messages({
                update(message: Message): void {
                    console.log("New message received " + message.text)
                }
            })
        } else {
            navigator.user().login()
        }
    }

    logout(): Promise<Boolean> {
        return new Promise<Boolean>((resolve) => {
            if (dataManager.hasSession()) {
                dataManager.clearSession()
            }
            resolve(true);
            navigator.user().login();
            this.messagesSubscription?.unsubscribe()
        })
    }

    messages(subscriber: Subscriber<Message>) {
        this.messagesSubscription = apiManager.user().messages().subscribe(subscriber)
    }

    allMessages(): Promise<Array<Message>> {
       return new Promise<Array<Message>>((resolve, rejects) => {
           apiManager.user().messagesBy(dataManager.readSession().userId).response<Array<Message>>().then(messages => {
               resolve(messages)
           }).catch(rejects)
       })
    }
}

const userManager: UserManager = new UserManagerImpl();

export default userManager

