<script setup lang="ts">
import {EmployeeAssignmentOptions} from "../../../model/enums/EmployeeAssigmentOption.ts";
import type {User} from "../../../model/entities/User.ts";
import EmployeeSelectInput from "./EmployeeSelectInput.vue";
import {ref, watch} from "vue";

interface Props {
  id: string;
  label: string;
  modelValueEmployee: User | null;
  modelValueOption: EmployeeAssignmentOptions
  errorMessage: string;
}

interface Emits {
  (e: 'update:modelValueOption', employee: EmployeeAssignmentOptions): void

  (e: 'update:modelValueEmployee', employee: User | null): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const assignmentOptions = [
  {
    id: "none-assignment",
    label: "Don't assign employee for this task.",
    assignmentOption: EmployeeAssignmentOptions.NONE
  },
  {
    id: "self-assignment",
    label: "Assign me for this task.",
    assignmentOption: EmployeeAssignmentOptions.SELF
  }, {
    id: "employee-assignment",
    label: "Assign employee for this task.",
    assignmentOption: EmployeeAssignmentOptions.EMPLOYEE
  }
]

const selectedEmployee = ref<User | null>(null);

watch(selectedEmployee, () => {
  emit("update:modelValueEmployee", selectedEmployee.value);
})

function onAssignmentOptionChange(option: EmployeeAssignmentOptions) {
  emit('update:modelValueOption', option)
}

</script>

<template>
  <div class="d-flex flex-column">
    <label for="" class="form-label">{{ label }}</label>
    <div v-for="option in assignmentOptions"
         class="employee-assignment-option-wrapper d-flex flex-row-reverse justify-content-end rounded">
      <label :for="option.id" class="w-100 p-2 ps-1">{{ option.label }}</label>
      <input :id="option.id"
             :key="option.id"
             name="assignment-option"
             type="radio"
             class="me-1"
             :checked="modelValueOption === option.assignmentOption"
             @change="onAssignmentOptionChange(option.assignmentOption)">
    </div>
    <employee-select-input v-if="modelValueOption === EmployeeAssignmentOptions.EMPLOYEE"
                           :id="id"
                           :model-value="selectedEmployee"
                           :error-message="errorMessage"
                           class="mt-2"/>
  </div>
</template>

<style scoped>
.employee-assignment-option-wrapper:hover,
.employee-assignment-option-wrapper > *:hover {
  background-color: var(--bs-secondary-bg-subtle);
  cursor: pointer !important;
}
</style>