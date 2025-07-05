import type {User} from "../../types/User.ts";
import {defineStore} from "pinia";

export interface State {
    user: User | null;
}

export const useUserDataStore = defineStore("user-data-store", {
    state(): State {
        return {
            user: null,
        }
    },
    actions: {
        setUser(user: User | null) {
            this.user = user;
        }
    }
})