import {defineStore} from "pinia";

export const useUserAsideStore = defineStore("userAsideStore", {
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