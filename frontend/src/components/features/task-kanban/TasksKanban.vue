<script setup lang="ts">
import KanbanCol from "../../common/kanban/KanbanCol.vue";
import Kanban from "../../common/kanban/Kanban.vue";
import {computed, onUnmounted} from "vue";
import TaskKanbanCard from "./TaskKanbanCard.vue";
import Selectable from "../../utils/Selectable.vue";
import {useTaskToolboxStore} from "../../../stores/features/task/task-toolbox-store.ts";
import TaskToolbox from "../task-toolbox/TaskToolbox.vue";
import type {Task} from "../../../types/Task.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";

interface Props {
  storyId: string;
  tasks: Task[];
}

const props = defineProps<Props>()
const toolboxStore = useTaskToolboxStore();

const todoTasks = computed(() => props.tasks.filter(task => task.workingState === WorkingState.TODO));
const doingTasks = computed(() => props.tasks.filter(task => task.workingState === WorkingState.DOING));
const doneTasks = computed(() => props.tasks.filter(task => task.workingState === WorkingState.DONE));

const taskColumns = computed(() => [
  {
    title: "Todo",
    class: "bg-warning-subtle",
    tasks: todoTasks.value,
  },
  {
    title: "Doing",
    class: "bg-primary-subtle",
    tasks: doingTasks.value,
  },
  {
    title: "Done",
    class: "bg-success-subtle",
    tasks: doneTasks.value,
  }
]);

onUnmounted(() => {
  toolboxStore.setTask(null)
})

</script>

<template>
  <kanban v-if="tasks" title="Tasks">
    <template v-slot:toolbox>
      <task-toolbox :story-id="storyId"/>
    </template>
    <template v-slot:body>
      <kanban-col
          v-for="column in taskColumns"
          :key="column.title"
          :title="column.title"
          :class="['min-height', column.class]">
        <selectable
            v-for="task in column.tasks"
            :key="task.id.toString()"
            :selected="toolboxStore.task?.id === task.id"
            @click="toolboxStore.setTask(task)">
          <task-kanban-card :task="task"/>
        </selectable>
      </kanban-col>
    </template>
  </kanban>
</template>