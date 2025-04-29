import {defineStore} from "pinia";
import type {Story} from "../../model/entities/Story.ts";
import {WorkingState} from "../../model/enums/WorkingState.ts";
import {useUserStore} from "../user/UserStore.ts";
import {assertProjectDefined} from "../../helpers/Guards.ts";
import {projectRepository} from "../../repositories";

const DRAG_EVENT_STORY_ID_KEY = "StoryID";

type StoryColumn = {
    title: string;
    class: string;
    state: WorkingState;
    stories: Story[];
};

export const useStoryKanbanStore = defineStore("storyKanbanStore", {
    getters: {
        attachedProject() {
            return useUserStore().attachedProject;
        },

        todoStories(): Story[] {
            return this.attachedProject?.stories.filter(s => s.state === WorkingState.TODO) ?? [];
        },

        doingStories(): Story[] {
            return this.attachedProject?.stories.filter(s => s.state === WorkingState.DOING) ?? [];
        },

        doneStories(): Story[] {
            return this.attachedProject?.stories.filter(s => s.state === WorkingState.DONE) ?? [];
        },

        storyColumns(): StoryColumn[] {
            return [
                {
                    title: "Todo",
                    class: "bg-warning-subtle",
                    state: WorkingState.TODO,
                    stories: this.todoStories,
                },
                {
                    title: "Doing",
                    class: "bg-primary-subtle",
                    state: WorkingState.DOING,
                    stories: this.doingStories,
                },
                {
                    title: "Done",
                    class: "bg-success-subtle",
                    state: WorkingState.DONE,
                    stories: this.doneStories,
                }
            ];
        }
    },

    actions: {
        onStoryDrag(event: DragEvent, story: Story) {
            if (!event.dataTransfer) {
                throw new Error("Cannot process story drag event because data transfer is undefined.");
            }

            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData(DRAG_EVENT_STORY_ID_KEY, story.id.toString());
        },

        onStoryDrop(event: DragEvent, destinationState: WorkingState) {
            const userStore = useUserStore();
            const attachedProject = userStore.attachedProject;
            assertProjectDefined(attachedProject);

            if (!event.dataTransfer) {
                throw new Error("Cannot process story drop event because data transfer is undefined.");
            }

            const storyId = event.dataTransfer.getData(DRAG_EVENT_STORY_ID_KEY);
            const story = attachedProject.stories.find(s => s.id === storyId);

            if (!story) {
                throw new Error("Cannot handle project story drop event because story was not found.");
            }

            if (story.state !== destinationState) {
                story.state = destinationState;
                projectRepository.update(attachedProject);
            }
        }
    }
});
