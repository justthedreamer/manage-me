<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import StoriesKanban from "../components/features/story-kanban/StoriesKanban.vue";
import {onMounted, ref} from "vue";
import type {Project} from "../types/Project.ts";
import {useProjectDataStore} from "../stores/data/project-data-store.ts";
import {storeToRefs} from "pinia";
import projectService from "../services/ProjectService.ts";

const projectDataStore = useProjectDataStore();
const {currentProjectId} = storeToRefs(projectDataStore);
const project = ref<Project | null>(null);

onMounted(async () => {
  projectDataStore.restore();
  if (currentProjectId.value) {
    project.value = await projectService.getByIdAsync(currentProjectId.value);
    console.log(project.value);
  }
})

</script>

<template>
  <div v-if="project" id="attached-project-wrapper">
    <header>
      <h2>{{ project.name }}</h2>
      <p>{{ project.description }}</p>
      <hr>
    </header>
    <stories-kanban/>
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