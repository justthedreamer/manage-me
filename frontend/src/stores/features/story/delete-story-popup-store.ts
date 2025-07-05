import {defineStore} from "pinia";
import type {Story} from "../../../types/Story.ts";

interface State {
    story: Story | null,
    opened: boolean,
}

export const useDeleteStoryPopupStore = defineStore("deleteStoryPopupStore", {
    state(): State {
        return {
            story: null,
            opened: false,
        }
    },
    actions: {
        open(story: Story) {
            this.story = story;
            this.opened = true;
        },
        close() {
            this.story = null;
            this.opened = false;
        },
    }
})