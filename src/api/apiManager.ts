import apiClient, {ApiClient} from "./apiClient";
import  {UserApiManager, UserApi} from "./apis/userApi";



interface ApiManager {

    user() : UserApi

}

interface ApiManager {

    user() : UserApi;
}

class ServiceManagerImpl implements ApiManager {
    userApi: UserApi;

    constructor(apiClient: ApiClient) {
        this.userApi = new UserApiManager(apiClient)
    }

    user(): UserApi {
        return this.userApi
    }

}

const apiManager: ApiManager = new ServiceManagerImpl(apiClient);

export default apiManager