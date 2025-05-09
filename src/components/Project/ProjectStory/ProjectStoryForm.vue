<script setup lang="ts">
import {useProjectStoryFormStore} from "../../../stores/Project/ProjectStoryFormStore.ts";
import {storeToRefs} from "pinia";
import FullScreenWrapper from "../../Common/FullScreenWrapper.vue";
import {ProjectStoryPriority} from "../../../model/enums/ProjectStoryPriority.ts";
import {ProjectStoryState} from "../../../model/enums/ProjectStoryState.ts";

// store
const store = useProjectStoryFormStore();

// inputs
const {
  storyName,
  storyDescription,
  storyPriority,
  storyState,
  storyNameErrorMessage,
  storyDescriptionErrorMessage,
  opened,
  mode,
} = storeToRefs(store);
</script>

<template>
  <full-screen-wrapper v-if="opened">
    <!--  Project Story Form  -->
    <div id="project-story-form"
         class="position-absolute rounded-2 w-75 p-4 bg-light shadow border border-1 ease-in-top"
         style="max-width: 780px">

      <!-- Header -->
      <header class="d-flex justify-content-between align-items-center">
        <h4>{{ store.formTitle }}</h4>
        <i class="bi bi-x-circle fs-4 link-secondary" style="cursor: pointer" @click="store.close"></i>
      </header>
      <hr>
      <!--  Form  -->
      <form @submit.prevent="store.handleSubmit" class="row">
        <!-- Priority Select -->
        <div class="col">
          <label for="project-priority-select">Priority</label>
          <select name="project priority"
                  id="project-priority-select"
                  class="form-control"
                  v-model="storyPriority">
            <option selected disabled>Select priority</option>
            <option v-for="priority in ProjectStoryPriority" :value="priority">
              {{ priority }}
            </option>
          </select>
        </div>

        <!-- State Select -->
        <div class="col">
          <label for="project-state-select">State</label>
          <select name="project state"
                  id="project-state-select"
                  class="form-control"
                  v-model="storyState">
            <option disabled>State</option>
            <option v-for="state in ProjectStoryState" :value="state">{{ state }}</option>
          </select>
        </div>

        <!--  Name Input -->
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name"
                 type="text"
                 class="form-control"
                 placeholder="Story name"
                 v-model="storyName"
                 :required="true">
          <p class="text-danger">{{ storyNameErrorMessage }}</p>
        </div>

        <!-- Description Input -->
        <div class="form-group">
          <label for="project-story-description">Description</label>
          <textarea id="project-story-description"
                    class="form-control"
                    rows="5"
                    placeholder="Story description"
                    v-model="storyDescription"></textarea>
          <p class="text-danger">{{ storyDescriptionErrorMessage }}</p>
        </div>

        <!--  Form Create Mode Controls  -->
        <div v-if="mode === 'create'" class="d-flex gap-1 justify-content-center">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>

        <!--  Form Update Mode Controls  -->
        <div v-else-if="mode === 'update'" class="d-flex gap-1 justify-content-between">
          <button type="button" title="Remove project story" class="btn btn-danger" @click="store.handleRemove">
            Remove
          </button>
          <button type="submit" title="Save changes" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  </full-screen-wrapper>
</template>

<style scoped>
form > *:not(:first-child) {
  margin-block: .225rem;
}
</style>