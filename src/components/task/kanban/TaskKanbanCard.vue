<script setup lang="ts">
import {type PropType} from "vue";
import {DoingTask, DoneTask, type Task} from "../../../model/entities/Task.ts";
import {formatDateToEuropean} from "../../../helpers/DateHelper.ts";
import PriorityBadge from "../../badges/PriorityBadge.vue";
import TimeHoursBadge from "../../badges/TimeHoursBadge.vue";
import UserBadge from "../../badges/UserBadge.vue";

defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
})

</script>

<template>
  <div class="task-card border rounded bg-white shadow-sm w-100 p-2 p-2">
    <header class="d-flex justify-content-between align-self-center">
      <p class="mb-0">{{ task.name }}</p>
      <div class="d-flex gap-1 align-items-center">
        <priority-badge :priority="task.priority"/>
        <time-hours-badge :hours="task.estimatedFinishTime"/>
      </div>
    </header>
    <hr class="mt-2">
    <main>
      <p>{{ task.description }}</p>
    </main>
    <hr class="mt-2 mb-2">
    <footer class="d-flex justify-content-between align-items-center text-secondary">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <user-badge v-if="task instanceof DoingTask || task instanceof DoneTask" :user="task.assignedUser"/>
        <span v-if="task instanceof DoingTask || task instanceof DoneTask">
          Started: {{ formatDateToEuropean(task.workStartDate) }}
        </span>
        <span>Created: {{ formatDateToEuropean(task.creationDate) }}</span>
      </div>
    </footer>
  </div>
</template>