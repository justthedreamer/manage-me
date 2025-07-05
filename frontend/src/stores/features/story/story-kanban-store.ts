import {defineStore} from "pinia";
import type {Story} from "../../../types/Story.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";
import {useUserDataStore} from "../../data/user-data-store.ts";
import storyService from "../../../services/StoryService.ts";
import {useUIMessageStore} from "../ui-message-store.ts";
import {UIMessageType} from "../../../components/features/ui-messages/UIMessage.ts";

const DRAG_EVENT_STORY_ID_KEY = "StoryID";

type StoryColumn = {
    title: string;
    class: string;
    state: WorkingState;
    stories: Story[];
};

interface State {
    stories: Story[]
}

export const useStoryKanbanStore = defineStore("storyKanbanStore", {
    state(): State {
        return {
            stories: [],
        }
    },
    getters: {
        todoStories(): Story[] {
            return this.stories.filter(s => s.state === WorkingState.TODO) ?? [];
        },

        doingStories(): Story[] {
            return this.stories.filter(s => s.state === WorkingState.DOING) ?? [];
        },

        doneStories(): Story[] {
            return this.stories.filter(s => s.state === WorkingState.DONE) ?? [];
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
        async init() {
            const projectId = useUserDataStore().attachedProjectId;
            if (!projectId) {
                useUIMessageStore().queue({
                    type: UIMessageType.ERROR,
                    message: `Project is not attached.`
                })
                throw new Error("Project is not attached.");
            }

            return await storyService.getByProjectIdAsync(projectId);
        },
        onStoryDrag(event: DragEvent, story: Story) {
            if (!event.dataTransfer) {
                throw new Error("Cannot process story drag event because data transfer is undefined.");
            }

            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData(DRAG_EVENT_STORY_ID_KEY, story.id.toString());
        },

        async onStoryDropAsync(event: DragEvent, destinationState: WorkingState) {
            const projectId = useUserDataStore().attachedProjectId;
            if (!projectId) {
                useUIMessageStore().queue({
                    type: UIMessageType.ERROR,
                    message: `Project is not attached.`
                })
                throw new Error("Project is not attached.");
            }

            if (!event.dataTransfer) {
                throw new Error("Cannot process story drop event because data transfer is undefined.");
            }

            const storyId = event.dataTransfer.getData(DRAG_EVENT_STORY_ID_KEY);
            const story = this.stories.find(s => s.id === storyId);

            if (!story) {
                throw new Error("Cannot handle project story drop event because story was not found.");
            }

            if (story.state !== destinationState) {
                story.state = destinationState;
                await storyService.updateAsync(projectId, storyId, {
                    name: story.name,
                    description: story.description,
                    state: story.state,
                    priority: story.priority,
                })
            }
        }
    }
});
