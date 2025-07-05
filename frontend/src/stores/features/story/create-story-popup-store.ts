import {defineStore} from "pinia";
import {assertProjectDefined} from "../../../helpers/Guards.ts";
import storyValidator from "../../../validation/validators/StoryValidator.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";
import {Priority} from "../../../enums/Priority.ts";
import {useProjectDataStore} from "../../data/project-data-store.ts";
import storyService from "../../../services/StoryService.ts";

export interface State {
    opened: boolean;
    fields: {
        name: string;
        description: string;
        state: WorkingState;
        priority: Priority;
    };
    errors: {
        name: string;
        description: string;
    };
}

const initialState = (): State => {
    return {
        fields: {
            name: "",
            description: "",
            priority: Priority.LOW,
            state: WorkingState.TODO,
        },
        errors: {
            name: "",
            description: "",
        },
        opened: false,
    };
}

export const useCreateStoryPopupStore = defineStore("createStoryPopupStore", {
    state(): State {
        return initialState();
    },
    actions: {
        open() {
            this.opened = true;
        },
        close() {
            this.opened = false;
            this.$reset();
        },
        clearError(error: keyof typeof this.errors) {
            this.errors[error] = ''
        },
        validate(): boolean {
            const validationErrors = storyValidator.validateAll({
                name: this.fields.name,
                description: this.fields.description,
            });
            return handleValidationErrors(validationErrors, this.errors);
        },
        // todo: move this logic to the component
        async create() {
            if (!this.validate()) return;

            const projectDataStore = useProjectDataStore();
            const currentProject = projectDataStore.currentProjectId;
            assertProjectDefined(currentProject);

            await storyService.createAsync(currentProject.id, {
                name: this.fields.name,
                description: this.fields.description,
                priority: this.fields.priority,
                workingState: this.fields.state,
            })
            this.close();
        },
    },
});