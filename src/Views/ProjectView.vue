<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import ProjectStoriesBox from "../components/Project/ProjectStory/ProjectStoriesBox.vue";
import {useProjectStore} from "../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import ProjectStoryForm from "../components/Project/ProjectStory/ProjectStoryForm.vue";

const store = useProjectStore();
const {attachedProject} = storeToRefs(store);
store.syncAttachedProject()
</script>

<template>
  <project-story-form/>
  <div v-if="attachedProject" id="attached-project-wrapper">
    <header>
      <h2>{{ attachedProject.name }}</h2>
      <p>{{ attachedProject.description }}</p>
      <hr>
    </header>
    <project-stories-box :project="attachedProject"/>
  </div>

  <div v-else>
    <div class="alert alert-warning">
      <p>
        You dont have attached project. Navigate to
        <router-link :to="Routes.PROJECT_ATTACHMENT_RECORD.path">Attached</router-link>
        tab and select project you want to work with.
      </p>
    </div>
  </div>
</template>