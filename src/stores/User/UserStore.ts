import {defineStore} from "pinia";
import type {User} from "../../model/User.ts";
import {registeredUserMock} from "../../mocks/UserMocks.ts";
import type {UUIDTypes} from "uuid";
import {UserNotLoggedInError} from "../../errors/UserNotLoggedInError.ts";

export interface UserState {
    user: User | null
}

export const useUserStore = defineStore('userStore', {
    state: (): UserState => {
        return {
            user: registeredUserMock,
        }
    },
    getters: {
        attachedProjectId(): UUIDTypes | null {
            if (!this.user) return null
            return this.user?.attachedProjectId;
        },
        getUserSession(): User {
            return ensureUserLoggedIn(this.user)
        }
    },
    actions: {
        login() {
            this.user = registeredUserMock;
        },
        logout() {
            this.user = null;
        },
        attachProject(projectId: UUIDTypes) {
            ensureUserLoggedIn(this.user)
            this.user!.attachedProjectId = projectId;
        }
    }
})

export function ensureUserLoggedIn(user: User | null): User {
    if (!user) throw new UserNotLoggedInError("User not logged in.");
    return user;
}