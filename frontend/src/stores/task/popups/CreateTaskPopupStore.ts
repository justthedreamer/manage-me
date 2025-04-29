import {defineStore} from "pinia";
import type {Story} from "../../../model/entities/Story.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import {Task} from "../../../model/entities/Task.ts";
import {useUserStore} from "../../user/UserStore.ts";
import taskValidator from "../../../validation/validators/TaskValidator.ts";
import {projectRepository} from "../../../repositories";
import {
    assertNever,
    assertStoryDefined,
    assertUserDefined,
    assertUserDevopsOrDeveloper
} from "../../../helpers/Guards.ts";
import {TaskFactory} from "../../../factories/TaskFactory.ts";
import {EmployeeAssignmentOptions} from "../../../model/enums/EmployeeAssigmentOption.ts";
import type {User} from "../../../model/entities/User.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";

export interface State {
    opened: boolean;
    story: Story | null;
    fields: {
        name: string,
        description: string,
        priority: Priority,
        estimatedFinishTime: number
        assignmentOption: EmployeeAssignmentOptions
        selectedEmployee: User | null
    };
    errors: {
        name: string,
        description: string,
        estimatedFinishTime: string,
        assignmentOption: string
    };
}

const initialState = (): State => {
    return {
        opened: false,
        story: null,
        fields: {
            name: "",
            description: "",
            priority: Priority.LOW,
            estimatedFinishTime: 0,
            assignmentOption: EmployeeAssignmentOptions.NONE,
            selectedEmployee: null,
        },
        errors: {
            name: "",
            description: "",
            estimatedFinishTime: "",
            assignmentOption: "",
        }
    }
}

export const useCreateTaskFormStore = defineStore("createTaskFormStore", {
    state(): State {
        return initialState();
    },
    actions: {
        open(story: Story) {
            this.story = story;
            this.opened = true;
        },
        close() {
            this.opened = false;
            this.story = null;
            this.$reset()
        },
        clearError(error: keyof typeof this.errors) {
            this.errors[error] = '';
        },
        getTask(): Task {
            assertStoryDefined(this.story)
            const storyId = this.story.id;
            const {name, description, priority, estimatedFinishTime, selectedEmployee} = this.fields;

            switch (this.fields.assignmentOption) {
                case EmployeeAssignmentOptions.NONE: {
                    return TaskFactory.CreateTodoTask(name, description, priority, storyId, estimatedFinishTime)
                }
                case EmployeeAssignmentOptions.SELF: {
                    const user = useUserStore().user;
                    assertUserDefined(user)
                    assertUserDevopsOrDeveloper(user)
                    return TaskFactory.CreateDoingTask(name, description, priority, storyId, estimatedFinishTime, user);
                }
                case EmployeeAssignmentOptions.EMPLOYEE: {
                    assertUserDefined(selectedEmployee)
                    return TaskFactory.CreateDoingTask(name, description, priority, storyId, estimatedFinishTime, selectedEmployee)
                }
                default: {
                    assertNever(this.fields.assignmentOption)
                }
            }
        },
        validate(): boolean {
            const validationErrors = taskValidator.validateAll({
                name: this.fields.name,
                description: this.fields.description,
                estimatedFinishTime: this.fields.estimatedFinishTime
            })

            let validationResult = handleValidationErrors(validationErrors, this.errors)

            if (this.fields.assignmentOption === EmployeeAssignmentOptions.EMPLOYEE && !this.fields.selectedEmployee) {
                this.errors.assignmentOption = "You must select an employee from list above."
                validationResult = false;
            }

            return validationResult;
        },
        submit() {
            if (!this.validate()) return;
            assertStoryDefined(this.story)
            const task = this.getTask();
            this.story.addTask(task)
            console.log(task)
            projectRepository.updateAttachedProject()
            this.close()
        }
    }
})