<script setup lang="ts">
import KanbanCol from "../../kanban/KanbanCol.vue";
import Kanban from "../../kanban/Kanban.vue";
import {storeToRefs} from "pinia";
import {computed, onUnmounted} from "vue";
import type {Story} from "../../../model/entities/Story.ts";
import TaskKanbanCard from "./TaskKanbanCard.vue";
import {DoingTask, DoneTask, Task, TodoTask} from "../../../model/entities/Task.ts";
import Selectable from "../../utils/Selectable.vue";
import {useTaskToolboxStore} from "../../../stores/task/TaskToolboxStore.ts";
import {useUserStore} from "../../../stores/user/UserStore.ts";
import TaskToolbox from "../toolbox/TaskToolbox.vue";

interface Props {
  story: Story;
}

const props = defineProps<Props>()

const userStore = useUserStore();
const toolboxStore = useTaskToolboxStore();

const {attachedProject} = storeToRefs(userStore);


function filterTasks<T extends Task>(type: new (...args: any[]) => T): T[] {
  return props.story.tasks.filter(task => task instanceof type) as T[];
}

const todoTasks = computed(() => filterTasks(TodoTask));
const doingTasks = computed(() => filterTasks(DoingTask));
const doneTasks = computed(() => filterTasks(DoneTask));


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
  <kanban v-if="attachedProject" title="Tasks">
    <template v-slot:toolbox>
      <task-toolbox :story="story"/>
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