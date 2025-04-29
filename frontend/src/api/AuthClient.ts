import http from "./Axios.ts";
import {User} from "../model/entities/User.ts";

interface AuthClient {
    login(data: LoginRequest): Promise<TokenResponse>;

    refreshToken(refreshToken: string): Promise<TokenResponse>;

    getCurrentUser(): Promise<User>;
}

interface LoginRequest {
    login: string;
    password: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface RefreshRequest {
    refreshToken: string;
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
    const response = await http.post<TokenResponse>("/login", data);
    return response.data;
}

export async function refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await http.post<TokenResponse>("/refresh", {
        refreshToken
    } as RefreshRequest);
    return response.data;
}

export async function getCurrentUser(): Promise<User> {
    const response = await http.get("/me");
    const data = response.data;
    return new User(
        data.id,
        data.name,
        data.surname,
        data.role,
        data.attachedProjectId
    );
}


const authClient: AuthClient = {
    login,
    refreshToken,
    getCurrentUser
};

export default authClient;