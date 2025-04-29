import {defineStore} from "pinia";
import {assertStoryDefined} from "../../../helpers/Guards.ts";
import type {Story} from "../../../model/entities/Story.ts";
import {projectRepository} from "../../../repositories";
import {useUserStore} from "../../user/UserStore.ts";
import storyValidator from "../../../validation/validators/StoryValidator.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import {WorkingState} from "../../../model/enums/WorkingState.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import {useStoryToolboxStore} from "../StoryToolboxStore.ts";

interface State {
    story: Story | null
    opened: boolean;
    fields: {
        name: string,
        description: string,
        state: WorkingState,
        priority: Priority,
    }
    errors: {
        name: string,
        description: string,
    }
}

const initialState = (): State => {
    return {
        story: null,
        opened: false,
        fields: {
            name: '',
            description: '',
            priority: Priority.LOW,
            state: WorkingState.TODO,
        },
        errors: {
            name: '',
            description: '',
        }
    }
}

export const useUpdateStoryPopupStore = defineStore("updateStoryFormPopupStore", {
    state(): State {
        return initialState()
    },
    actions: {
        open(story: Story) {
            this.story = story;
            this.fields.name = story.name;
            this.fields.description = story.description;
            this.fields.priority = story.priority;
            this.fields.state = story.state;
            this.opened = true;
        },
        close(): void {
            this.opened = false;
            this.story = null;
            this.$reset()
        },
        clearError(error: keyof typeof this.errors): void {
            this.errors[error] = '';
        },
        validate(): boolean {
            const validationErrors = storyValidator.validateAll(this.fields)
            return handleValidationErrors(validationErrors, this.errors)
        },
        update(): void {
            if (!this.validate()) return;
            assertStoryDefined(this.story)
            const {name, description, priority, state} = this.fields
            this.story.name = name;
            this.story.description = description;
            this.story.priority = priority;
            this.story.state = state;
            projectRepository.update(useUserStore().attachedProject!)
            useStoryToolboxStore().setStory(null)
            this.close()
        }
    }
})