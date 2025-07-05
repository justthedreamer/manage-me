<script setup lang="ts">
import {onMounted, ref} from "vue";
import {formatDateToEuropean} from "../../../helpers/DateHelper.ts";
import PriorityBadge from "../../common/badges/PriorityBadge.vue";
import TimeHoursBadge from "../../common/badges/TimeHoursBadge.vue";
import UserBadge from "../../common/badges/UserBadge.vue";
import type {Task} from "../../../types/Task.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";
import type {User} from "../../../types/User.ts";
import userService from "../../../services/UserService.ts";

interface Props {
  task: Task
}

const props = defineProps<Props>()

// user should appear there if task is in doing or done state.
const assignedUser = ref<User | null>(null);

onMounted(async () => {
  if (props.task.workingState !== WorkingState.TODO) {
    assignedUser.value = await userService.getByIdAsync(props.task.userId!)
  }
})

</script>

<template>
  <div class="task-card border rounded bg-body shadow-sm w-100 p-2 p-2">
    <header class="d-flex justify-content-between align-self-center">
      <p class="mb-0">{{ task.name }}</p>
      <div class="d-flex gap-1 align-items-center">
        <priority-badge :priority="task.priority"/>
        <time-hours-badge :hours="task.estimatedFinishTimeHours"/>
      </div>
    </header>
    <hr class="mt-2">
    <main>
      <p>{{ task.description }}</p>
    </main>
    <hr class="mt-2 mb-2">
    <footer class="d-flex justify-content-between align-items-center text-secondary">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <user-badge v-if="assignedUser"
                    :user="assignedUser"/>
        <span v-if="task.workingStartDate">
          Started: {{ formatDateToEuropean(task.workingStartDate) }}
        </span>
        <span>Created: {{ formatDateToEuropean(task.createdAt) }}</span>
        <span v-if="task.finishedDate">Finished: {{ formatDateToEuropean(task.finishedDate) }}</span>
      </div>
    </footer>
  </div>
</template>