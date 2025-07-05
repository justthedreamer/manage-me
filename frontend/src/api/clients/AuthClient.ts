import type {AccessTokenResult} from "../responses/access-token-result.ts";
import {type ClientRequestResult, genericInternalServerErrorClientRequestResult} from "../ClientRequestResult.ts";
import http from "../Axios.ts";

export interface AuthClient {
    login(login: string, password: string): Promise<ClientRequestResult<AccessTokenResult>>

    refreshToken(refreshToken: string): Promise<ClientRequestResult<AccessTokenResult>>
}

const authClient: AuthClient = {
    async login(login: string, password: string): Promise<ClientRequestResult<AccessTokenResult>> {
        const response = await http.post<AccessTokenResult>("auth/login", {login, password})
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: "Logged in successfully"
                }
            }
            case 401: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: "Invalid credentials"
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },

    async refreshToken(refreshToken: string): Promise<ClientRequestResult<AccessTokenResult>> {
        const response = await http.post<AccessTokenResult>("auth/refreshToken", {refreshToken});
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: "Token refreshed successfully"
                }
            }
            case 401: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: "Failed to refresh token"
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
}

export default authClient;