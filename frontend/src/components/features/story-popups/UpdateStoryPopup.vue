<script setup lang="ts">
import {useUpdateStoryPopupStore} from "../../../stores/features/story/update-story-form-popup-store.ts";
import FormPopup from "../../common/popup/FormPopup.vue";
import PriorityInput from "../../common/inputs/PriorityInput.vue";
import WorkingStateInput from "../../common/inputs/WorkingStateInput.vue";
import TextInput from "../../common/inputs/TextInput.vue";
import TextAreaInput from "../../common/inputs/TextAreaInput.vue";

const store = useUpdateStoryPopupStore();

</script>

<template>
  <form-popup id="update-story-popup"
              title="Update story"
              :width="'w-50'"
              :active="store.opened"
              @submit="store.updateAsync"
              @cancel="store.close">
    <template v-slot:inputs>
      <div class="d-flex">
        <priority-input id="create-story-priority-input"
                        v-model="store.fields.priority"/>

        <working-state-input id="create-story-working-state-input"
                             v-model="store.fields.state"/>
      </div>
      <text-input id="create-story-name-input"
                  label="Name"
                  v-model="store.fields.name"
                  :error-message="store.errors.name"
                  @update:model-value="store.clearError('name')"/>

      <text-area-input id="create-story-name-description-input"
                       label="Description"
                       v-model="store.fields.description"
                       :error-message="store.errors.description"
                       @update:model-value="store.clearError('description')"/>
    </template>
  </form-popup>
</template>