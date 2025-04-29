<script setup lang="ts">
import {useDeleteTaskPopupStore} from "../../../stores/task/popups/DeleteTaskPopupStore.ts";
import ConfirmPopup from "../../utils/popups/ConfirmPopup.vue";

const store = useDeleteTaskPopupStore()

</script>

<template>
  <confirm-popup id="delete-task-confirm-popup"
                 title="Are you sure you want to delete this task?"
                 :active="store.opened"
                 @confirm="store.deleteTask"
                 @cancel="store.close">
    <template v-slot:message>
      <p class="mb-0">This process will permanently delete task from project.</p>
      <p>Are you sure you want to continue?</p>
    </template>
  </confirm-popup>
</template>