import {defineStore} from "pinia";

export const useUserAsideStore = defineStore("userAsideStoer", {
    state() {
        return {
            opened: false,
        }
    },
    actions: {
        open() {
            this.opened = true;
        },
        close() {
            this.opened = false;
        }
    }
})