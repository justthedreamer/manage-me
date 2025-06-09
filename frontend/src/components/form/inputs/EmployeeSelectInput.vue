<script setup lang="ts">
import type {User} from "../../../model/entities/User.ts";
import EmployeeSearch from "../../searching/EmployeeSearch.vue";
import {ref, watch} from "vue";
import UserBadge from "../../badges/UserBadge.vue";

interface Props {
  id: string,
  label?: string,
  modelValue: User | null,
  searchFiler?: (user: User) => boolean
  errorMessage: string
}

interface Emits {
  (e: 'update:modelValue', employee: User | null): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()


const selectedEmployee = ref<User | null>(null)

watch(selectedEmployee, (val: User | null) => {
  selectEmployee(val)
})

function selectEmployee(user: User | null) {
  selectedEmployee.value = user
  emit('update:modelValue', user)
}

</script>

<template>
  <div :id="id">
    <span v-if="label" :id="id" class="form-label">{{ label }}</span>
    <employee-search v-model="selectedEmployee" :filter="searchFiler"/>
    <div v-if="selectedEmployee" class="d-flex gap-1 pt-1 pb-1">
      <user-badge :user="selectedEmployee"/>
      <i class="bi bi-x-circle-fill text-danger pointer" @click="selectEmployee(null)"/>
    </div>
    <p class="form-text text-danger">{{ errorMessage }}</p>
  </div>
</template>