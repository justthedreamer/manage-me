import {defineStore} from "pinia";
import {Priority} from "../../model/enums/Priority.ts";
import {WorkingState} from "../../model/enums/WorkingState.ts";
import storyValidator from "../../validation/StoryValidator.ts";
import type {Story} from "../../model/Story.ts";
import {newGuid} from "../../helpers/GuidHelper.ts";
import {useProjectStore} from "../Project/ProjectStore.ts";
import {useUserStore} from "../User/UserStore.ts";
import {InvalidOperationError} from "../../errors/InvalidOperationError.ts";

export interface CreateStoryFormFields {
    name: string,
    description: string,
    priority: Priority,
    state: WorkingState,
}

export interface CreateStoryFormErrorMessages {
    nameErrorMessage: string,
    descriptionErrorMessage: string,
}

export interface CreateStoryFormState {
    opened: boolean
    fields: CreateStoryFormFields,
    errors: CreateStoryFormErrorMessages,
}

export const useCreateStoryFormStore = defineStore("Create Story Form Store", {
    state: (): CreateStoryFormState => {
        return {
            opened: false,
            fields: {
                name: "",
                description: "",
                priority: Priority.LOW,
                state: WorkingState.TODO,
            },
            errors: {
                nameErrorMessage: "",
                descriptionErrorMessage: "",
            }
        }
    },
    actions: {
        open() {
            this.opened = true;
        },
        close() {
            this.opened = false;
        },
        submit() {
            let isValid = true;

            storyValidator.validateName(this.fields.name, (errorMessage) => {
                this.errors.nameErrorMessage = errorMessage
                isValid = false;
            })
            storyValidator.validateDescription(this.fields.description, (errorMessage) => {
                this.errors.descriptionErrorMessage = errorMessage
                isValid = false;
            })

            if (!isValid) return;

            const projectStore = useProjectStore();
            const userStore = useUserStore();

            const project = projectStore.attachedProject;

            if (!project) {
                throw new InvalidOperationError("Cannot create story because project is not attached.")
            }

            const user = userStore.getUserSession

            const story: Story = {
                id: newGuid(),
                userId: user.id,
                projectId: project.id,
                name: this.fields.name,
                description: this.fields.description,
                priority: this.fields.priority,
                state: this.fields.state,
                createdAt: new Date(),
                tasks: []
            }

            project.stories.push(story)
            projectStore.updateAttachedProject();

        }
    }
})