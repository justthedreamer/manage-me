import {defineStore} from "pinia";
import {assertStoryDefined} from "../../../helpers/Guards.ts";
import type {Story} from "../../../types/Story.ts";
import storyValidator from "../../../validation/validators/StoryValidator.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";
import {Priority} from "../../../enums/Priority.ts";
import storyService from "../../../services/StoryService.ts";
import {useProjectDataStore} from "../../data/project-data-store.ts";
import {useUIMessageStore} from "../ui-message-store.ts";
import {UIMessageType} from "../../../components/features/ui-messages/UIMessage.ts";

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
        async updateAsync(): Promise<void> {
            if (!this.validate()) return;
            assertStoryDefined(this.story)
            const projectId = useProjectDataStore().currentProjectId?.id;
            if (!projectId) {
                useUIMessageStore().queue({
                    type: UIMessageType.ERROR,
                    message: "Project is not attached"
                })
                throw new Error("Project is not attached")
            }

            await storyService.updateAsync(projectId, this.story.id, {
                name: this.fields.name,
                description: this.fields.description,
                priority: this.fields.priority,
                state: this.fields.state
            })
            this.close()
        }
    }
})