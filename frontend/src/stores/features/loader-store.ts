import {defineStore} from "pinia";

export const useLoaderStore = defineStore("loaderStore", {
    state() {
        return {
            active: false
        }
    },
    actions: {
        activate() {
            this.active = true;
        },
        deactivate() {
            this.active = false;
        }
    }
})