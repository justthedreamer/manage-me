<script setup lang="ts">
import {computed, ref} from "vue";
import {Priority} from "../../model/enums/Priority.ts";
import {useCreateTaskFormStore} from "../../stores/Task/CreateTaskFormStore.ts";
import FullScreenWrapper from "../Common/FullScreenWrapper.vue";
import PriorityBadge from "../Common/PriorityBadge.vue";
import {usersMocks} from "../../mocks/UserMocks.ts";
import {UserRole} from "../../model/enums/UserRole.ts";
import {storeToRefs} from "pinia";
import {Developer, Devops} from "../../model/User.ts";
import Hover from "../UI/Hover.vue";

const formStore = useCreateTaskFormStore();
const {fields, validationErrorMessages} = storeToRefs(formStore)

const employeesListSearchPhraseInput = ref("")
const employeesList = computed(() => {
  return usersMocks.filter(user => {
    const searchingPhrase = employeesListSearchPhraseInput.value.toLowerCase().trim();
    const splitSearchingPhrase = searchingPhrase.split(/\s+/);

    const userId = user.id.toString().toLowerCase();
    const userFullName = `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`;
    const isDevopsOrDeveloper = user.role === UserRole.DEVOPS || user.role === UserRole.DEVELOPER;

    if (!isDevopsOrDeveloper) return false;
    if (!splitSearchingPhrase.length || splitSearchingPhrase[0] === "") return true;

    return splitSearchingPhrase.every(phrase =>
        userId.includes(phrase) || userFullName.includes(phrase)
    );
  }) as Array<Devops | Developer>
})

</script>

<template>
  <full-screen-wrapper class="bg-blur" v-if="formStore.opened">
    <form id="create-taks-form" @submit.prevent="formStore.submit"
          v-if="formStore.opened"
          class="border border-1 rounded bg-white shadow-lg p-3">
      <header id="create-task-form-header" class="d-flex justify-content-between">
        <h2>Create Task</h2>
        <span class="bi bi-x fs-2 text-secondary" style="cursor: pointer;" @click="formStore.close()"></span>
      </header>
      <hr>
      <div id="create-task-form-inputs-priority" class="w-100">
        <label class="d-block" for="">Priority</label>
        <hover :effect="'fade'" :class="{off: fields.priority === Priority.LOW}">
          <priority-badge :priority="Priority.LOW"
                          class="me-1"
                          @click="fields.priority = Priority.LOW"/>
        </hover>
        <hover :effect="'fade'" :class="{off: fields.priority === Priority.MEDIUM}">
          <priority-badge :priority="Priority.MEDIUM"
                          :class="{'active' : fields.priority === Priority.MEDIUM}"
                          class="me-1"
                          @click="fields.priority = Priority.MEDIUM"/>

        </hover>
        <hover :effect="'fade'" :class="{off: fields.priority === Priority.HIGH}">
          <priority-badge :priority="Priority.HIGH"
                          :class="{'active' : fields.priority === Priority.HIGH}"
                          class="m-1"
                          @click="fields.priority = Priority.HIGH"/>
        </hover>
      </div>
      <div id="create-task-form-inputs-name" class="d-flex flex-column">
        <label for="task-name-input">Name</label>
        <input type="text"
               id="task-name-input"
               class="p-1"
               placeholder="Task name.."
               v-model="fields.name"
               @input="validationErrorMessages.nameValidationMessage = ''"
               required/>
        <p class="text-danger">{{ validationErrorMessages.nameValidationMessage }}</p>
      </div>
      <div id="create-task-form-inputs-description" class="d-flex flex-column">
        <label for="task-description-input">Description</label>
        <textarea rows="3"
                  type="text"
                  class="p-1"
                  placeholder="Task description.."
                  id="task-description-input"
                  v-model="fields.description"
                  @change="validationErrorMessages.descriptionValidationMessage = ''"
                  required></textarea>
        <p class="text-danger">{{ validationErrorMessages.descriptionValidationMessage }}</p>
      </div>
      <div id="create-task-form-inputs-estimated-time" class="mb-2">
        <label for="">Estimated finish time: </label>
        <input type="number"
               class="ms-1 me-1"
               style="width: 50px"
               v-model="fields.estimatedFinishTimeHours"
               @change="validationErrorMessages.estimatedFinishTimeHoursMessage = ''"
               required>
        <span>hours</span>
        <p class="text-danger">{{ validationErrorMessages.estimatedFinishTimeHoursMessage }}</p>
      </div>
      <div id="create-task-form-inputs-assigment-options" class="d-flex flex-column gap-1">
        <div>
          <input type="radio"
                 name="assignment-option"
                 id="none-assignment"
                 class="me-1"
                 :checked="fields.assignmentOption === `NONE`"
                 @change="() => {fields.assignmentOption = `NONE`; fields.selectedEmployee = null}"/>
          <label for="none-assignment">Don't assign employee</label>
        </div>

        <div>
          <input type="radio"
                 name="assignment-option"
                 id="none-assignment"
                 class="me-1"
                 :checked="fields.assignmentOption === `SELF`"
                 @change="() => {fields.assignmentOption = `SELF`; fields.selectedEmployee = null}"/>
          <label for="self-assignment">Assign me for this task</label>
        </div>

        <div>
          <input type="radio"
                 name="assignment-option"
                 id="none-assignment"
                 class="me-1"
                 :checked="fields.assignmentOption === `EMPLOYEE`"
                 @change="() => {fields.assignmentOption = `EMPLOYEE`; fields.selectedEmployee = null}"/>
          <label for="employee-assignment"
                 class="mb-1">Assign employee for this task</label>
        </div>
      </div>
      <div id="create-task-form-inputs-employee-selection" :class="{active: fields.assignmentOption === `EMPLOYEE` }">
        <div id="create-task-form-inputs-employee-list" class="rounded">
          <div v-for="employee in employeesList"
               class="employee-assignment-list-item d-flex justify-content-between p-1 ps-2 pe-2"
               :class="{selected: fields.selectedEmployee?.id === employee.id}"
               @click="fields.selectedEmployee = employee">
            <span>{{ employee.name }} {{ employee.surname }}</span>
            <span class="text-secondary">{{ employee.id.slice(0, 8) }}</span>
          </div>
        </div>
        <input id="create-task-form-inputs-employee-list-search-input"
               type="text"
               placeholder="Search by name or id..."
               class="employee-assignment-search-input w-50 mt-1 p-1 w-100 border-secondary-subtle border-1 rounded"
               v-model="employeesListSearchPhraseInput">
      </div>
      <p class="text-danger">{{ validationErrorMessages.assignmentOptionMessage }}</p>
      <button class="d-block btn btn-primary m-auto p-2 ps-4 pe-4 mt-3">Create</button>
    </form>
  </full-screen-wrapper>
</template>

<style scoped>
#create-taks-form {
  width: 80vw;
  min-height: 40vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000 !important;
}

.badge {
  transition: .3s;
}

.badge:hover {
  opacity: 1 !important;
  cursor: pointer;
}

#create-task-form-inputs-employee-selection {
  max-height: 0;
  overflow-y: hidden;
  transition: .3s;
  border: 0 !important;
}

#create-task-form-inputs-employee-selection.active {
  max-height: 300px;
}

#create-task-form-inputs-employee-list {
  border: 1px solid var(--bs-border-color) !important;
  overflow-y: scroll;
}

#create-task-form-inputs-employee-list-search-input {
  border: 1px solid var(--bs-border-color) !important;
  outline: none !important;
}

#create-task-form-inputs-employee-list-search-input:focus {
  border-color: var(--bs-primary) !important;
}

.employee-assignment-list-item:hover,
.employee-assignment-list-item:hover > span {
  background-color: var(--bs-secondary-bg-subtle);
  cursor: pointer;
}

.employee-assignment-list-item.selected,
.employee-assignment-list-item.selected > span {
  background-color: var(--bs-primary);
  color: var(--bs-light) !important;
}

</style>