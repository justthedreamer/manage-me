<script setup lang="ts">
import FullScreenWrapper from "../../utils/FullScreenWrapper.vue";
import {useUpdateTaskPopupStore} from "../../../stores/task/popups/UpdateTaskPopupStore.ts";
import FormPopup from "../../utils/popups/FormPopup.vue";
import PriorityInput from "../../form/inputs/PriorityInput.vue";
import TextInput from "../../form/inputs/TextInput.vue";
import TextAreaInput from "../../form/inputs/TextAreaInput.vue";
import NumberInput from "../../form/inputs/NumberInput.vue";

const store = useUpdateTaskPopupStore();

</script>

<template>
  <full-screen-wrapper v-if="store.opened">
    <form-popup id="update-task-popup"
                title="Update task"
                :active="store.opened"
                :width="'w-50'"
                @submit="store.submit"
                @cancel="store.close">
      <template v-slot:inputs>
        <priority-input id="update-task-priority-input"
                        v-model="store.fields.priority"/>

        <text-input id="update-task-name-input"
                    label="Name"
                    v-model="store.fields.name"
                    :error-message="store.errors.name"/>

        <text-area-input id="update-task-description-input"
                         label="Description"
                         v-model="store.fields.description"
                         :error-message="store.errors.description"/>

        <number-input id="update-task-estimated-time-input"
                      label="Estimated time"
                      unit="hours"
                      :width="'w-25'"
                      v-model="store.fields.estimatedFinishTime"
                      :error-message="store.errors.estimatedFinishTime"/>
      </template>
    </form-popup>
  </full-screen-wrapper>
</template>