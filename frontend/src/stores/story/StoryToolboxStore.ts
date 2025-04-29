import {defineStore} from "pinia";
import {Story} from "../../model/entities/Story.ts";

interface State {
    story: Story | null;
}

export const useStoryToolboxStore = defineStore("storyToolboxStore", {
    state(): State {
        return {
            story: null,
        }
    },
    actions: {
        setStory(story: Story | null) {
            if (this.story?.id === story?.id) {
                this.story = null;
                return;
            }

            this.story = story;
        }
    }
})