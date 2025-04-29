import {defineStore} from "pinia";
import type {UIMessage} from "../../model/UIMessage.ts";

export interface State {
    messages: UIMessage[]
}

const messageDisplayTimeMs = 3500;

export const useUIMessageStore = defineStore("messageStore", {
    state: (): State => {
        return {
            messages: []
        }
    },
    actions: {
        queue(message: UIMessage) {
            this.messages.push(message)
            setTimeout(() => {
                this.messages.pop()
            }, messageDisplayTimeMs)
        }
    }
})