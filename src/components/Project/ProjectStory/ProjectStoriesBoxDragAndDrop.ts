import type {ProjectStory} from "../../../model/ProjectStory.ts";
import type {ProjectStoryState} from "../../../model/enums/ProjectStoryState.ts";
import {useProjectStore} from "../../../stores/Project/ProjectStore.ts";

const STORE_ID_EVENT_DATA_KEY = "StoryID";

export function onStoryDragStart(
    event: DragEvent,
    story: ProjectStory)
    : void {
    if (!event.dataTransfer) {
        throw new Error("Cannot process project story card drag event because data transfer is undefined.");
    }
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(STORE_ID_EVENT_DATA_KEY, story.id.toString());
}

export function onStoryDrop(
    event: DragEvent,
    destinationState: ProjectStoryState,
    stories: ProjectStory[],
    persistenceUpdateRequired: boolean = true)
    : ProjectStory {
    if (!event.dataTransfer) {
        throw new Error("Cannot handle project story drop event because data transfer object is undefined.")
    }
    const itemId = event.dataTransfer.getData(STORE_ID_EVENT_DATA_KEY);

    const story = stories.find(story => story.id === itemId);

    if (!story) {
        throw new Error("Cannot handle project story drop event because story was not found.")
    }

    if (story.state !== destinationState) {
        story.state = destinationState;
    }

    if (persistenceUpdateRequired) {
        const store = useProjectStore();
        store.updateAttachedProject()
    }

    return story;
}