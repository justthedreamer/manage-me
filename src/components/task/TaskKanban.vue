<script setup lang="ts">

import KanbanCol from "../kanban/KanbanCol.vue";
import Kanban from "../kanban/Kanban.vue";
import {useProjectStore} from "../../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import {computed, type PropType} from "vue";
import type {Story} from "../../model/Story.ts";
import TaskKanbanCard from "./TaskKanbanCard.vue";
import {DoingTask, DoneTask, Task, TodoTask} from "../../model/Task.ts";
import {InvalidOperationError} from "../../errors/InvalidOperationError.ts";
import {useUIMessageStore} from "../../stores/Common/UIMessageStore.ts";

const uiStore = useUIMessageStore();
const projectStore = useProjectStore();
const {attachedProject} = storeToRefs(projectStore);

const props = defineProps({
  story: {
    type: Object as PropType<Story>,
    required: true
  }
})

const todoTasks = computed(() => {
  return props.story?.tasks.filter(task => task instanceof TodoTask)
})

const doingTasks = computed(() => {
  return props.story?.tasks.filter(task => task instanceof DoingTask)
})

const doneTasks = computed(() => {
  return props.story?.tasks.filter(task => task instanceof DoneTask)
})

const DRAG_EVENT_TASK_ID_KEY = "TaskID";

function onTaskDrag(event: DragEvent, task: Task) {
  if (!event.dataTransfer) {
    throw new InvalidOperationError("Cannot handle drag event because transfer data is not reachable.")
  }
  event.dataTransfer.setData(DRAG_EVENT_TASK_ID_KEY, task.id.toString())
}


function onTodoDrop(event: DragEvent) {
  const task = getTaskFromEvent(event);

  if (task instanceof TodoTask) return;

  uiStore.queue({
    type: "failure",
    message: "Cannot move a task that is already in progress or completed back to TODO."
  })
}


function onDoingDrop(event: DragEvent) {
}


function onDoneDrop(event: DragEvent) {
}

function getTaskFromEvent(event: DragEvent): Task {
  if (!event.dataTransfer) {
    throw new InvalidOperationError("Cannot handle drop event because transfer data is not reachable")
  }

  const taskId = event.dataTransfer.getData(DRAG_EVENT_TASK_ID_KEY);
  const task = props.story?.tasks.find(task => task.id === taskId);

  if (!task) {
    throw new InvalidOperationError("Cannot handle drop event because transfer task is not found")
  }

  return task;
}
</script>

<template>
  <kanban v-if="attachedProject">
    <kanban-col title="Todo"
                class="bg-warning-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onTodoDrop($event)">
      <task-kanban-card v-for="task in todoTasks"
                        :task="task"
                        draggable="true"
                        @dragstart="onTaskDrag($event,task)"/>
    </kanban-col>
    <kanban-col title="Doing"
                class="bg-primary-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onDoingDrop($event)">
      <task-kanban-card v-for="task in doingTasks"
                        :task="task"
                        draggable="true"
                        @dragstart="onTaskDrag($event,task)"/>

    </kanban-col>
    <kanban-col title="Done"
                class="bg-success-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onDoneDrop($event)">
      <task-kanban-card v-for="task in doneTasks"
                        :task="task"
                        draggable="true"
                        @dragstart="onTaskDrag($event,task)"/>
    </kanban-col>
  </kanban>
</template>

<style scoped>

</style>