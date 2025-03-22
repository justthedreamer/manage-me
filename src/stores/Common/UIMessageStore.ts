import {defineStore} from "pinia";

export type UISuccessMessage = { type: 'success', message: string };
export type UIFailureMessage = { type: 'failure', message: string };
export type UIMessage = UISuccessMessage | UIFailureMessage;

export interface UIMessageState {
    messages: UIMessage[]
}

const messageDisplayTimeMs = 3500;

export const useUIMessageStore = defineStore("messageStore", {
    state: (): UIMessageState => {
        return {
            messages: []
        }
    },
    getters: {
        defaultProjectNotAttachedMessage(): UIMessage {
            return {
                type: "failure",
                message: "Project is not attached. Navigate to Attachment tab and select project you want to work with."
            }
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