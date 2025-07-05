<script setup lang="ts">

import {useProjectDataStore} from "../stores/data/project-data-store.ts";
import {storeToRefs} from "pinia";
import {Routes} from "../routing/Routes.ts";
import {onMounted, ref} from "vue";
import type {Project} from "../types/Project.ts";
import projectClient from "../api/clients/ProjectClient.ts";

//state
const errorState = ref<boolean>(false);

// refs
const projectDataStore = useProjectDataStore();
const {currentProjectId} = storeToRefs(projectDataStore)
const projects = ref<Project[]>()

onMounted(async () => {
  const response = await projectClient.getAll()
  if (response.isSuccess) {
    projects.value = response.requestResult!
  } else {
    errorState.value = true;
  }
})

function isAttachedProject(projectId: string): boolean {
  console.log(currentProjectId.value + " - " + projectId);
  return currentProjectId.value === projectId;
}

function projectRowClass(projectId: string): string {
  return isAttachedProject(projectId) ? "table-success" : "";
}

function buttonClass(projectId: string): string {
  return isAttachedProject(projectId) ? "btn btn-secondary disabled" : "btn btn-primary";
}

function canAttachProject(projectId: string): boolean {
  return !isAttachedProject(projectId);
}

</script>

<template>
  <h2>Projects</h2>
  <hr/>

  <div v-if="!currentProjectId" class="alert alert-warning" role="alert">
    You don't have any attached project. Select one from the list below.
  </div>

  <div v-else class="alert alert-primary" role="alert">
    One of the projects is already attached to your account.
    You can explore it in
    <router-link :to="Routes.PROJECT_ROUTE_RECORD.path">Project</router-link>
    tab or attach another one from the list below.
  </div>

  <table v-if="!errorState" class="table border border-1 mt-3">
    <thead class="bg-dark text-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="project in projects"
        :key="project.id"
        :class="projectRowClass(project.id)">
      <td>{{ project.name }}</td>
      <td>{{ project.description }}</td>
      <td>
        <button
            :class="buttonClass(project.id)"
            @click="canAttachProject(project.id) && projectDataStore
            .setCurrentProject(project.id)">
          Attach
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
