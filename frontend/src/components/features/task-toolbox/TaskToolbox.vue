<script setup lang="ts">
import {useTaskToolboxStore} from "../../../stores/features/task/task-toolbox-store.ts";
import {storeToRefs} from "pinia";
import {useCreateTaskFormStore} from "../../../stores/features/task/create-task-popup-store.ts";
import {useUpdateTaskPopupStore} from "../../../stores/features/task/update-task-popup-store.ts";
import CreateTaskPopup from "../task-popups/CreateTaskPopup.vue";
import DeleteTaskPopup from "../task-popups/DeleteTaskPopup.vue";
import UpdateTaskPopup from "../task-popups/UpdateTaskPopup.vue";
import AssignEmployeePopup from "../task-popups/AssignEmployeePopup.vue";
import DoneTaskPopup from "../task-popups/DoneTaskPopup.vue";
import {useDeleteTaskPopupStore} from "../../../stores/features/task/delete-task-popup-store.ts";
import {useAssignEmployeePopupStore} from "../../../stores/features/task/assign-employee-popup-store.ts";
import {useDoneTaskPopupStore} from "../../../stores/features/task/done-task-popup-store.ts";
import {WorkingState} from "../../../enums/WorkingState.ts";

interface Props {
  storyId: string;
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
      <button class="btn btn-sm btn-primary" @click="createTaskFormStore.open(storyId)">New Task</button>
    </template>
    <template v-if="task">
      <delete-task-popup/>
      <button class="btn btn-sm btn-danger" @click="deleteTaskPopupStore.open(task)">Delete</button>
      <update-task-popup/>
      <button class="btn btn-sm btn-primary"
              @click="updateTaskBaseInfoFormStore.open({taskId: task.id,storyId: storyId})">Update base info
      </button>

      <template v-if="task.workingState === WorkingState.TODO">
        <assign-employee-popup/>
        <button class="btn btn-sm btn-success"
                @click="assignEmployeePopupStore.open({taskId: task!.id, storyId: storyId})">Assign employee
        </button>
      </template>

      <template v-if="task.workingState === WorkingState.DONE">
        <done-task-popup/>
        <button class="btn btn-sm btn-success"
                @click="doneTaskPopupStore.open({taskId: task.id,storyId: storyId})">Done
        </button>
      </template>
    </template>
  </div>
</template>