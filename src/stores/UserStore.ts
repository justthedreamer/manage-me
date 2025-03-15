import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {User} from "../model/User.ts";

const userMock: User = {
    id: 1,
    name: "John",
    surname: "Doe",
}

export type UserStore = {
    user: User | null;
    increment: () => void;
}

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User | null>(userMock);

    function login() {
        user.value = userMock;
    }

    function logout() {
        user.value = null;
    }

    return {user, logout, login}
})
