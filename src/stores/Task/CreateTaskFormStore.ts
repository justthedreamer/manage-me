import {defineStore} from "pinia";
import type {Story} from "../../model/Story.ts";
import {Priority} from "../../model/enums/Priority.ts";
import {Developer, Devops} from "../../model/User.ts";
import {InvalidArgumentError} from "../../errors/InvalidArgumentError.ts";
import {InvalidOperationError} from "../../errors/InvalidOperationError.ts";
import {DoingTask, TodoTask} from "../../model/Task.ts";
import {newGuid} from "../../helpers/GuidHelper.ts";
import {useUIMessageStore} from "../Common/UIMessageStore.ts";
import {useProjectStore} from "../Project/ProjectStore.ts";
import {useUserStore} from "../User/UserStore.ts";
import {UserRole} from "../../model/enums/UserRole.ts";
import {usersMocks} from "../../mocks/UserMocks.ts";
import {NotFoundError} from "../../errors/NotFoundError.ts";
import taskValidator from "../../validation/TaskValidator.ts";

interface FormFields {
    name: string,
    description: string,
    priority: Priority,
    estimatedFinishTimeHours: number
    assignmentOption: "NONE" | "SELF" | "EMPLOYEE"
    selectedEmployee: Developer | Devops | null
}

interface ValidationErrorMessages {
    nameValidationMessage: string,
    descriptionValidationMessage: string,
    estimatedFinishTimeHoursMessage: string,
    assignmentOptionMessage: string
}

export interface CreateTaskFormStoreState {
    opened: boolean;
    story: Story | null;
    fields: FormFields;
    validationErrorMessages: ValidationErrorMessages;
}

export const useCreateTaskFormStore = defineStore("Create task form store", {
    state(): CreateTaskFormStoreState {
        return {
            opened: false,
            story: null,
            fields: {
                name: "",
                description: "",
                priority: Priority.LOW,
                estimatedFinishTimeHours: 0,
                assignmentOption: "NONE",
                selectedEmployee: null,
            },
            validationErrorMessages: {
                nameValidationMessage: "",
                descriptionValidationMessage: "",
                estimatedFinishTimeHoursMessage: "",
                assignmentOptionMessage: "",
            }
        }
    },
    actions: {
        open(story: Story) {
            this.story = story;
            this.opened = true;
        },
        close() {
            this.opened = false;
        },
        submit() {
            const uiStore = useUIMessageStore();

            if (!this.story) {
                uiStore.queue({
                    type: "failure",
                    message: "Cannot create task at this moment. Checkout your browser console for more information or contact admin."
                });
                throw new InvalidOperationError("Cannot create task because story is undefined.");
            }

            // Clear messages
            this.validationErrorMessages = {
                nameValidationMessage: "",
                descriptionValidationMessage: "",
                estimatedFinishTimeHoursMessage: "",
                assignmentOptionMessage: ""
            };

            taskValidator.validateName(this.fields.name, msg => {
                this.validationErrorMessages.nameValidationMessage = msg;
                throw new InvalidArgumentError(msg);
            });

            taskValidator.validateDescription(this.fields.description, msg => {
                this.validationErrorMessages.descriptionValidationMessage = msg;
                throw new InvalidArgumentError(msg);
            });

            taskValidator.validateEstimatedFinishTime(this.fields.estimatedFinishTimeHours, msg => {
                this.validationErrorMessages.estimatedFinishTimeHoursMessage = msg;
                throw new InvalidArgumentError(msg);
            });

            taskValidator.validateEmployeeAssignment(this.fields.assignmentOption, this.fields.selectedEmployee, msg => {
                this.validationErrorMessages.assignmentOptionMessage = msg;
                throw new InvalidOperationError(msg);
            });

            const projectStore = useProjectStore();

            if (this.fields.assignmentOption === "NONE") {
                const task = new TodoTask(
                    newGuid(),
                    this.fields.name,
                    this.fields.description,
                    this.fields.priority,
                    this.story.id,
                    this.fields.estimatedFinishTimeHours,
                    new Date()
                );
                this.story.tasks.push(task);
                projectStore.updateAttachedProject();
                return;
            }

            let user;
            const userStore = useUserStore();

            if (this.fields.assignmentOption === "SELF") {
                user = userStore.getUserSession;
            } else {
                user = usersMocks.find(user => user.id === this.fields.selectedEmployee!.id);
                if (!user) throw new NotFoundError("user not found.");
            }

            if (user.role !== UserRole.DEVOPS && user.role !== UserRole.DEVELOPER) {
                throw new InvalidOperationError("user role should be DEVOPS or DEVELOPER.");
            }

            const now = new Date();
            const task = new DoingTask(
                newGuid(),
                this.fields.name,
                this.fields.description,
                this.fields.priority,
                this.story.id,
                this.fields.estimatedFinishTimeHours,
                now,
                now,
                user as Devops | Developer
            );
            this.story.tasks.push(task);
            projectStore.updateAttachedProject();
        }

    }
})