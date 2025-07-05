import {ACCESS_TOKEN_KEY, ATTACHED_PROJECT_ID_KEY, REFRESH_TOKEN_KEY} from "../config/LocalstorageKeys.ts";
import {useLoaderStore} from "../stores/features/loader-store.ts";
import userClient from "../api/clients/UserClient.ts";
import {useUIMessageStore} from "../stores/features/ui-message-store.ts";
import {UIMessageType} from "../components/features/ui-messages/UIMessage.ts";
import {useUserDataStore} from "../stores/data/user-data-store.ts";
import type {User} from "../types/User.ts";
import authClient from "../api/clients/AuthClient.ts";

export interface UserService {
    loginAsync(login: string, password: string): Promise<boolean>;

    restoreUserStateAsync(): Promise<boolean>

    findAsync(): Promise<User[]>

    logout(): void

    getByIdAsync(id: string): Promise<User>
}

async function loginAsync(login: string, password: string): Promise<boolean> {
    useLoaderStore().activate()
    const response = await authClient.login(login, password);
    useLoaderStore().deactivate()
    if (response.isSuccess) {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, response.requestResult?.accessToken!)
        sessionStorage.setItem(REFRESH_TOKEN_KEY, response.requestResult?.refreshToken!)
        await restoreUserStateAsync()
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: response.message,
        });
        return true;
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: response.message,
        })
        return false;
    }
}

async function restoreUserStateAsync(): Promise<boolean> {
    const response = await userClient.me();
    if (response.isSuccess) {
        useUserDataStore().setUser(response.requestResult!)
        return true
    } else {
        console.log(response.message);
        return false;
    }
}

async function findAsync(): Promise<User[]> {
    const result = await userClient.find({isDeveloper: false, isDevops: false})
    if (result.isSuccess) {
        return result.requestResult!;
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to fetch users, check web console for more details"
        })
        throw new Error(result.message);
    }
}

async function getByIdAsync(id: string): Promise<User> {
    const response = await userClient.getById(id)
    if (response.isSuccess) {
        return response.requestResult!;
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to find user, check web console for more details"
        })
        throw new Error(response.message);
    }
}

function logout(): void {
    useLoaderStore().activate()
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    sessionStorage.removeItem(REFRESH_TOKEN_KEY)
    sessionStorage.removeItem(ATTACHED_PROJECT_ID_KEY)
    useUserDataStore().$reset()
    useLoaderStore().deactivate()
}

const userService: UserService = {
    loginAsync,
    findAsync,
    restoreUserStateAsync,
    logout,
    getByIdAsync,
}

export default userService;