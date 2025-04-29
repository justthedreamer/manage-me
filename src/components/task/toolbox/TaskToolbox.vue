<script setup lang="ts">
import {DoingTask, TodoTask} from "../../../model/entities/Task.ts";
import {useTaskToolboxStore} from "../../../stores/task/TaskToolboxStore.ts";
import {storeToRefs} from "pinia";
import {useCreateTaskFormStore} from "../../../stores/task/popups/CreateTaskPopupStore.ts";
import type {Story} from "../../../model/entities/Story.ts";
import {useUpdateTaskPopupStore} from "../../../stores/task/popups/UpdateTaskPopupStore.ts";
import CreateTaskPopup from "../popups/CreateTaskPopup.vue";
import DeleteTaskPopup from "../popups/DeleteTaskPopup.vue";
import UpdateTaskPopup from "../popups/UpdateTaskPopup.vue";
import AssignEmployeePopup from "../popups/AssignEmployeePopup.vue";
import DoneTaskPopup from "../popups/DoneTaskPopup.vue";
import {useDeleteTaskPopupStore} from "../../../stores/task/popups/DeleteTaskPopupStore.ts";
import {useAssignEmployeePopupStore} from "../../../stores/task/popups/AssignEmployeePopupStore.ts";
import {useDoneTaskPopupStore} from "../../../stores/task/popups/DoneTaskPopupStore.ts";

interface Props {
  story: Story;
}

defineProps<Props>()

const toolboxStore = useTaskToolboxStore();
const createTaskFormStore = useCreateTaskFormStore();
const updateTaskBaseInfoFormStore = useUpdateTaskPopupStore();
const deleteTaskPopupStore = useDeleteTaskPopupStore();
const assignEmployeePopupStore = useAssignEmployeePopupStore();
const doneTaskPopupStore = useDoneTaskPopupStore();

const {task} = storeToRefs(toolboxStore)
</script>

<template>
  <div class="d-flex justify-content-end gap-1 w-100">
    <template v-if="!task">
      <create-task-popup/>
      <button class="btn btn-sm btn-primary" @click="createTaskFormStore.open(story)">New Task</button>
    </template>
    <template v-if="task">
      <delete-task-popup/>
      <button class="btn btn-sm btn-danger" @click="deleteTaskPopupStore.open(task)">Delete</button>
      <update-task-popup/>
      <button class="btn btn-sm btn-primary" @click="updateTaskBaseInfoFormStore.open(task)">Update base info</button>
    </template>
    <template v-if="task instanceof TodoTask">
      <assign-employee-popup/>
      <button class="btn btn-sm btn-success" @click="assignEmployeePopupStore.open(task)">Assign employee</button>
    </template>
    <template v-if="task instanceof DoingTask">
      <done-task-popup/>
      <button class="btn btn-sm btn-success" @click="doneTaskPopupStore.open(task)">Done</button>
    </template>
  </div>
</template>