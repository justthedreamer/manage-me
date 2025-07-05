<script setup lang="ts">
import {useDoneTaskPopupStore} from "../../../stores/features/task/done-task-popup-store.ts";
import ConfirmPopup from "../../common/popup/ConfirmPopup.vue";

const store = useDoneTaskPopupStore();

</script>

<template>
  <confirm-popup id="done-task-confirm-popup"
                 title="Are you sure you want to continue?"
                 :active="store.opened"
                 @cancel="store.close"
                 @confirm="store.doneTask">
    <template v-slot:message>
      <p>Are you sure you want to mark this task as done?</p>
    </template>
  </confirm-popup>
</template>