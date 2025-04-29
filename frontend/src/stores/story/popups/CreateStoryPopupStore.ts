import {defineStore} from "pinia";
import {useUIMessageStore} from "../../common/UIMessageStore.ts";
import {useUserStore} from "../../user/UserStore.ts";
import {assertProjectDefined, assertUserDefined} from "../../../helpers/Guards.ts";
import {SuccessUIMessage} from "../../../model/UIMessage.ts";
import {Story} from "../../../model/entities/Story.ts";
import {projectRepository} from "../../../repositories";
import {newGuid} from "../../../helpers/GuidHelper.ts";
import storyValidator from "../../../validation/validators/StoryValidator.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import {WorkingState} from "../../../model/enums/WorkingState.ts";
import {Priority} from "../../../model/enums/Priority.ts";

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
        create() {
            if (!this.validate()) return;

            const userStore = useUserStore();
            const user = userStore.user;
            assertUserDefined(user);

            const attachedProject = userStore.attachedProject;
            assertProjectDefined(attachedProject);

            attachedProject.addStory(
                new Story(
                    newGuid(),
                    this.fields.name,
                    this.fields.description,
                    this.fields.priority,
                    this.fields.state,
                    user.id,
                    attachedProject.id,
                    []
                )
            );

            projectRepository.update(attachedProject);
            useUIMessageStore().queue(new SuccessUIMessage("Story created successfully!"));
            this.close();
        },
    },
});