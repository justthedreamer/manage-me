import type {UUIDTypes} from "uuid";
import type {Task} from "./Task.ts";
import {NotFoundError} from "../../errors/NotFoundError.ts";
import {Story} from "./Story.ts";

export class Project {
    id: UUIDTypes;
    name: string;
    description: string;
    stories: Story[];

    constructor(id: UUIDTypes, name: string, description: string, stories: Story[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stories = stories;
    }

    static fromJSON(obj: any): Project {
        const stories = Array.isArray(obj.stories)
            ? obj.stories.map(Story.fromJSON)
            : [];

        return new Project(
            obj.id as UUIDTypes,
            obj.name,
            obj.description,
            stories
        );
    }

    getStoryById(id: UUIDTypes): Story {
        const story = this.stories.find(s => s.id === id);
        if (!story) throw new NotFoundError("Story not found in project.");
        return story;
    }

    getStoryByTaskId(taskId: UUIDTypes): { story: Story; taskIndex: number } {
        const story = this.stories.find(s => s.tasks.some((t: Task) => t.id === taskId));
        if (!story) throw new NotFoundError("Cannot find story by task ID.");

        const taskIndex = story.tasks.findIndex((t: Task) => t.id === taskId);
        return {story, taskIndex};
    }

    addStory(story: Story) {
        this.stories.push(story);
    }

    removeStory(storyId: UUIDTypes) {
        const index = this.stories.findIndex(s => s.id === storyId);
        if (index === -1) throw new NotFoundError("Story not found in project.");
        this.stories.splice(index, 1);
    }
}
