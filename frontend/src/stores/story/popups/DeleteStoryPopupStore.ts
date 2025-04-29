import {defineStore} from "pinia";
import {assertProjectDefined, assertStoryDefined} from "../../../helpers/Guards.ts";
import type {Story} from "../../../model/entities/Story.ts";
import {useUserStore} from "../../user/UserStore.ts";
import {projectRepository} from "../../../repositories";
import {useStoryToolboxStore} from "../StoryToolboxStore.ts";

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
        delete() {
            assertStoryDefined(this.story)
            const project = useUserStore().attachedProject;
            assertProjectDefined(project)
            project.removeStory(this.story.id)
            projectRepository.updateAttachedProject()
            useStoryToolboxStore().setStory(null)
            this.close();
        }
    }
})