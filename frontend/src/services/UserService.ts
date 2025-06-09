import {ACCESS_TOKEN_KEY, ATTACHED_PROJECT_ID_KEY, REFRESH_TOKEN_KEY} from "../config/LocalstorageKeys.ts";
import {useLoaderStore} from "../stores/common/LoaderStore.ts";
import {useUserStore} from "../stores/user/UserStore.ts";
import authClient from "../api/AuthClient.ts";

type ErrorMessage = string | null;

export interface UserService {
    loginAsync(login: string, password: string): Promise<ErrorMessage>;

    restoreUserStateAsync(): Promise<void>

    logout(): void
}

async function loginAsync(login: string, password: string): Promise<ErrorMessage> {
    useLoaderStore().activate()
    try {
        const response = await authClient.login({login, password})
        sessionStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
        sessionStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken)
        await restoreUserStateAsync()
        return null;
    } catch (error: any) {
        switch (error.response?.status) {
            case 401:
                return "Invalid login or password";
            default:
                return "Unexpected error during login.";
        }
    } finally {
        useLoaderStore().deactivate()
    }
}

async function restoreUserStateAsync(): Promise<void> {
    try {
        const user = await authClient.getCurrentUser()
        useUserStore().setUser(user)
    } catch (error) {
        console.log("User not restored.")
    }
}

function logout(): void {
    useLoaderStore().activate()
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    sessionStorage.removeItem(REFRESH_TOKEN_KEY)
    sessionStorage.removeItem(ATTACHED_PROJECT_ID_KEY)
    useUserStore().$reset()
    useLoaderStore().deactivate()
}

const userService: UserService = {
    loginAsync,
    logout,
    restoreUserStateAsync,
}

export default userService;