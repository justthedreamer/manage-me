import {defineStore} from "pinia";
import {type Task} from "../../model/entities/Task.ts";

interface State {
    task: Task | null;
}

export const useTaskToolboxStore = defineStore("taskToolboxStore", {
    state(): State {
        return {
            task: null
        }
    },
    actions: {
        setTask(task: Task | null) {
            if (task === this.task) {
                this.task = null;
                return;
            }
            this.task = task;
        },
    }
})