import {defineStore} from "pinia";
import {ProjectStoryPriority} from "../../model/enums/ProjectStoryPriority.ts";
import {ProjectStoryState} from "../../model/enums/ProjectStoryState.ts";
import {assertNever} from "../../helpers/SwitchHelper.ts";
import type {ProjectStory} from "../../model/ProjectStory.ts";
import projectValidator from "../../validation/ProjectValidator.ts";
import {InvalidArgumentError} from "../../errors/InvalidArgumentError.ts";
import {useProjectStore} from "./ProjectStore.ts";
import {InvalidOperationError} from "../../errors/InvalidOperationError.ts";

export type ProjectStoryFormMode = 'create' | 'update';

export interface ProjectStoryFormStoreState {
    mode: ProjectStoryFormMode;
    opened: boolean
    story: ProjectStory | null
    storyName: string;
    storyDescription: string;
    storyPriority: ProjectStoryPriority;
    storyState: ProjectStoryState,
    storyNameErrorMessage: string,
    storyDescriptionErrorMessage: string,
}

export const useProjectStoryFormStore = defineStore("ProjectStoryFormStore", {
    state: (): ProjectStoryFormStoreState => {
        return {
            opened: false,
            mode: 'create',
            story: null,
            storyName: "",
            storyDescription: "",
            storyPriority: ProjectStoryPriority.low,
            storyState: ProjectStoryState.todo,
            storyNameErrorMessage: "",
            storyDescriptionErrorMessage: "",
        }
    },
    getters: {
        formTitle: (state) => {
            switch (state.mode) {
                case "create":
                    return "Create Project Story";
                case "update":
                    return "Update Project Story";
                default:
                    assertNever(state.mode)
            }
        }
    },
    actions: {
        openCreateForm() {
            this.story = null;
            this.mode = "create";
            this.opened = true;
        },
        openUpdateForm(story: ProjectStory) {
            this.story = story;
            this.mode = "update";
            this.opened = true;

            this.storyName = story.name;
            this.storyDescription = story.description;
            this.storyState = story.state;
            this.storyPriority = story.priority;
        },
        close() {
            this.opened = false;
            this.storyName = "";
            this.storyDescription = "";
            this.storyPriority = ProjectStoryPriority.low;
            this.storyState = ProjectStoryState.todo;
            this.storyNameErrorMessage = "";
            this.storyDescriptionErrorMessage = "";
        },
        handleSubmit() {
            this.validateInputs()
            switch (this.mode) {
                case "create": {
                    const story: Omit<ProjectStory, "id" | "createdAt" | "userId" | "projectId"> = {
                        name: this.storyName,
                        description: this.storyDescription,
                        priority: this.storyPriority,
                        state: this.storyState,
                    }
                    const projectStore = useProjectStore();
                    projectStore.addProjectStory(story)
                    break;
                }
                case "update": {
                    if (!this.story)
                        throw new InvalidOperationError("Cannot update the project because story is not provided.")

                    this.story.name = this.storyName;
                    this.story.description = this.storyDescription;
                    this.story.priority = this.storyPriority;
                    this.story.state = this.storyState;

                    const projectStore = useProjectStore();
                    projectStore.updateAttachedProject();
                    break;
                }
                default:
                    assertNever(this.mode)
            }
            this.close()
        },
        handleRemove() {
            if (!this.story)
                throw new InvalidOperationError("Cannot remove story because story is not provided.")

            const confirmed = confirm("Are you sure you want to remove this story?")
            if (confirmed) {
                const projectStore = useProjectStore();
                projectStore.removeProjectStory(this.story)
                this.close()
            }
        },
        validateInputs() {
            projectValidator.validateProjectName(this.storyName, (errorMessage) => {
                this.storyNameErrorMessage = errorMessage;
                throw new InvalidArgumentError(errorMessage);
            });

            projectValidator.validateProjectDescription(this.storyDescription, (errorMessage) => {
                this.storyDescriptionErrorMessage = errorMessage;
                throw new InvalidArgumentError(errorMessage);
            });
        },
    }
})