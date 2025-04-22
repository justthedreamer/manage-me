<script setup lang="ts">
import PopupFormTemplate from "../forms/PopupFormTemplate.vue";
import FullScreenWrapper from "../common/FullScreenWrapper.vue";
import {useCreateStoryFormStore} from "../../stores/Story/CreateStoryFormStore.ts";
import FormPriorityInput from "../forms/common/FormPriorityInput.vue";
import FormWorkingStateInput from "../forms/common/FormWorkingStateInput.vue";
import FormLabel from "../forms/utils/FormLabel.vue";
import FormInput from "../forms/utils/FormInput.vue";
import FormErrorMessage from "../forms/utils/FormErrorMessage.vue";
import FormTextarea from "../forms/utils/FormTextarea.vue";

const store = useCreateStoryFormStore();

</script>

<template>
  <full-screen-wrapper class="bg-blur" v-if="store.opened">
    <popup-form-template title="Create Story" 
                         class="w-100 m-2" 
                         style="max-width: 600px" 
                         :close-handler="store.close"
                         :submit-handler="store.submit">
      <template v-slot:inputs>
        <section id="create-story-form-priority-working-state-section" class="d-flex mt-2">
          <form-priority-input class="w-100" :state-ref="store.fields.priority" :select-cb="priority => store.fields.priority = priority"/>
          <form-working-state-input class="w-100" :state-ref="store.fields.state" :select-cb="state => store.fields.state = state"/>
        </section>
        <section id="create-story-form-name-input-section" class="d-flex flex-column mt-2">
          <form-label input-id="create-story-form-name-input">Name</form-label>
          <form-input
              v-model="store.fields.name"
              type="text"
              placeholder="Story name..."
              :on-input="() => store.errors.nameErrorMessage = ''"/>
          <form-error-message :state-ref="store.errors.nameErrorMessage"/>
        </section>
        <section id="create-story-form-description-input-section" class="d-flex flex-column">
          <form-label input-id="create-story-form-description-input">Description</form-label>
          <form-textarea
              v-model="store.fields.description"
              placeholder="Description..."
              :on-input="() => store.errors.descriptionErrorMessage = ''"/>
          <form-error-message :state-ref="store.errors.descriptionErrorMessage"/>
        </section>
      </template>
      <template v-slot:controls>
        <button class="btn btn-primary mt-2">Create</button>
      </template>
    </popup-form-template>
  </full-screen-wrapper>
</template>
