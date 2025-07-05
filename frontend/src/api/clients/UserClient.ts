import http from "../Axios.ts";
import {type ClientRequestResult, genericInternalServerErrorClientRequestResult} from "../ClientRequestResult.ts";
import type {User} from "../../types/User.ts";
import type {FilterUsersRequest} from "../requests/filter-users-request.ts";

export interface UserClient {
    me(): Promise<ClientRequestResult<User>>

    find(filter: FilterUsersRequest): Promise<ClientRequestResult<User[]>>

    getById(id: string): Promise<ClientRequestResult<User>>
}

const userClient: UserClient = {
    async me(): Promise<ClientRequestResult<User>> {
        const response = await http.get<User>("/users/me");
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
    async find(filter: FilterUsersRequest): Promise<ClientRequestResult<User[]>> {
        const response = await http.get<User[]>(
            `/find?isDevops=${filter.isDevops}&isDeveloper=${filter.isDeveloper}`);
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

    async getById(id: string): Promise<ClientRequestResult<User>> {
        const response = await http.get<User>(`users/${id}`)
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: "User found successfully"
                }
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    }
}

export default userClient;
