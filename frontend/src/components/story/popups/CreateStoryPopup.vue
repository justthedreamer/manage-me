<script setup lang="ts">
import FormPopup from "../../utils/popups/FormPopup.vue";
import {useCreateStoryPopupStore} from "../../../stores/story/popups/CreateStoryPopupStore.ts";
import PriorityInput from "../../form/inputs/PriorityInput.vue";
import WorkingStateInput from "../../form/inputs/WorkingStateInput.vue";
import TextInput from "../../form/inputs/TextInput.vue";
import TextAreaInput from "../../form/inputs/TextAreaInput.vue";

const store = useCreateStoryPopupStore();

</script>

<template>
  <form-popup id="create-story-form"
              :width="'w-50'"
              title="Create story"
              :active="store.opened"
              @submit="store.create"
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