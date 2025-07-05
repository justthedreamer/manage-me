<script setup lang="ts">
import {useCreateTaskFormStore} from "../../../stores/features/task/create-task-popup-store.ts";
import FormPopup from "../../common/popup/FormPopup.vue";
import PriorityInput from "../../common/inputs/PriorityInput.vue";
import TextInput from "../../common/inputs/TextInput.vue";
import TextAreaInput from "../../common/inputs/TextAreaInput.vue";
import NumberInput from "../../common/inputs/NumberInput.vue";
import EmployeeAssignmentInput from "../../common/inputs/EmployeeAssignmentInput.vue";

const store = useCreateTaskFormStore();

</script>

<template>
  <form-popup id="create-task-form"
              title="Create task"
              :active="store.opened"
              @cancel="store.close"
              @submit="store.submit"
              :width="'w-75'">
    <template v-slot:inputs>
      <priority-input id="create-task-priority-input"
                      v-model="store.fields.priority"/>

      <text-input id="create-task-name-input"
                  label="Name"
                  v-model="store.fields.name"
                  :error-message="store.errors.name"
                  @update:model-value="store.clearError('name')"/>

      <text-area-input id="create-task-description-input"
                       label="Description"
                       v-model="store.fields.description"
                       :error-message="store.errors.description"
                       @update:model-value="store.clearError('description')"/>

      <number-input id="create-task-estimated-finish-time-input"
                    label="Estimated finish time"
                    width="w-25"
                    unit="hours"
                    :error-message="store.errors.estimatedFinishTime"
                    v-model="store.fields.estimatedFinishTimeHours"
                    @update:model-value="store.clearError('estimatedFinishTime')"/>

      <employee-assignment-input id="create-task-assignment-input"
                                 label="Employee assignment"
                                 :error-message="store.errors.assignmentOption"
                                 v-model:model-value-employee="store.fields.selectedEmployee"
                                 v-model:model-value-option="store.fields.assignmentOption"
                                 @update:model-value-option="store.clearError('assignmentOption')"/>
    </template>
  </form-popup>
</template>

<style scoped>
.employee-assignment-option-wrapper > *:hover {
  background-color: var(--bs-secondary-bg-subtle);
  cursor: pointer !important;
}
</style>