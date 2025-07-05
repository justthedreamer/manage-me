<script setup lang="ts">
import {useAssignEmployeePopupStore} from "../../../stores/features/task/assign-employee-popup-store.ts";
import {onMounted, ref} from "vue";
import type {Task} from "../../../types/Task.ts";
import taskService from "../../../services/TaskService.ts";

const store = useAssignEmployeePopupStore();

const task = ref<Task | null>(null);

onMounted(async () => {
  if (!store.taskId) {
    throw new Error("TaskId is missing");
  }
  task.value = await taskService.getByIdAsync(store.taskId);
})
</script>

<template>
  <form-popup id="assign-employee-for-task-popup"
              title="Assign employee for task"
              :width="'w-50'"
              :active="store.opened"
              @cancel="store.close"
              @submit="store.assignEmployee">
    <template v-slot:description>
      <h5 class="p-1">Task</h5>
      <task-kanban-card v-if="store.task" :task="store.task"/>
    </template>
    <template v-slot:inputs>
      <h5 class="mt-2 p-1">Employees list</h5>
      <employee-search :filter="taskEmployeeAssignmentFilter" v-model="store.selectedUser"/>
    </template>
    <template v-slot:footer>
      <div v-if="store.selectedUser" id="selected-user-section" class="d-flex gap-1 align-items-center">
        <user-badge :user="store.selectedUser"/>
        <i class="bi bi-x-circle-fill text-danger pointer" @click="store.selectedUser = null"/>
      </div>
    </template>
  </form-popup>
</template>