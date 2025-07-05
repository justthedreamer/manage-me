import {defineStore} from "pinia";
import {useUIMessageStore} from "../ui-message-store.ts";
import {useUserDataStore} from "../../data/user-data-store.ts";
import {UIMessageType} from "../../../components/features/ui-messages/UIMessage.ts";
import taskService from "../../../services/TaskService.ts";

interface State {
    opened: boolean;
    taskId: string | null;
    storyId: string | null;
    selectedUserId: string | null;
}

export const useAssignEmployeePopupStore = defineStore("useAssignEmployeePopupStore", {
    state(): State {
        return {
            opened: false,
            taskId: null,
            storyId: null,
            selectedUserId: null,
        };
    },
    actions: {
        open(data: { taskId: string, storyId: string }) {
            this.opened = true;
            this.taskId = data.taskId;
            this.storyId = data.storyId;
        },
        close() {
            this.taskId = null;
            this.storyId = null;
            this.selectedUserId = null;
            this.opened = false;
        },
        async assignEmployee() {
            if (!this.taskId) {
                throw new Error("Task ID is not defined")
            }
            if (!this.storyId) {
                throw new Error("StoryId is not defined")
            }
            if (!this.selectedUserId) {
                throw new Error("SelectedUserId is not defined")
            }

            const attachedProjectId = useUserDataStore().attachedProjectId;
            if (!attachedProjectId) {
                useUIMessageStore().queue({
                    type: UIMessageType.ERROR,
                    message: "Project is not attached.",
                })
                throw new Error("Attached project id is missing");
            }

            await taskService.setTaskDoingAsync(attachedProjectId, this.storyId, this.taskId, {
                userId: this.selectedUserId,
            })

            useUIMessageStore().queue({
                type: UIMessageType.SUCCESS,
                message: "Employee assigned successfully!"
            })

            this.close();
        },
    }
})