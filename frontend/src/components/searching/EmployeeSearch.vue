<script setup lang="ts">
import {computed, ref} from "vue";
import {User} from "../../model/entities/User.ts";
import {userRepository} from "../../repositories";

interface Props {
  modelValue: User | null;
  filter?: (user: User) => boolean | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: User | null): void;
}>()

const employeesListSearchPhraseInput = ref("");

const selectedEmployee = computed<User | null>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const employees = computed(() => {
  const users = userRepository.getAll();

  return users.filter(user => {
    const searchingPhrase = employeesListSearchPhraseInput.value.toLowerCase().trim();
    const splitSearchingPhrase = searchingPhrase.split(/\s+/);

    if (!splitSearchingPhrase.length || searchingPhrase[0] === '') return true;

    return splitSearchingPhrase.every(phrase => {
      return user.id.toString().includes(phrase) || user.fullName.toLowerCase().includes(phrase);
    });
  });
});

function handleEmployeeSelected(user: User | null) {
  if (user?.id === selectedEmployee.value?.id) {
    selectedEmployee.value = null;
  } else {
    selectedEmployee.value = user;
  }
}

function isEmployeeSelected(user: User) {
  return selectedEmployee.value?.id === user.id;
}

</script>

<template>
  <div id="search-employee">
    <div id="employee-list" class="rounded">
      <div v-for="employee in employees"
           class="list-item d-flex justify-content-between p-1 ps-2 pe-2 gap-5"
           :class="{selected: isEmployeeSelected(employee)}"
           @click="handleEmployeeSelected(employee)">
        <span class="text-dark">{{ employee.name }} {{ employee.surname }}</span>
        <span class="text-secondary">{{ employee.id.slice(0, 8) }}</span>
      </div>
      <p v-if="!employees.length" class="text-secondary m-2">No employee found.</p>
    </div>
    <input id="employee-search-phrase-input"
           type="text"
           placeholder="Search by name or id..."
           class="employee-assignment-search-input w-50 mt-2 p-1 w-100 border-secondary-subtle border-1 rounded"
           v-model="employeesListSearchPhraseInput">
  </div>
</template>

<style scoped>
#employee-list {
  border: 1px solid var(--bs-border-color) !important;
  overflow-y: scroll;
}

#employee-search-phrase-input {
  border: 1px solid var(--bs-border-color) !important;
  outline: none !important;
}

#employee-search-phrase-input:focus {
  border-color: var(--bs-primary) !important;
}

.list-item:hover,
.list-item:hover > span {
  background-color: var(--bs-secondary-bg-subtle);
  cursor: pointer;
}

.list-item.selected,
.list-item.selected > span {
  background-color: var(--bs-primary);
  color: var(--bs-light) !important;
}
</style>