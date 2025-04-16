<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import {useUserStore} from "../stores/User/UserStore.ts";
import type {UUIDTypes} from "uuid";
import {useProjectStore} from "../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";

// stores
const userStore = useUserStore()
const projectStore = useProjectStore();

// refs
const {user} = storeToRefs(userStore);
const {allAssociatedProjects} = storeToRefs(projectStore);
projectStore.syncAllAssociatedProjects()

const isAttached = (projectId: UUIDTypes) => {
  return projectId === user.value!.attachedProjectId;
}

</script>

<template>
  <!-- Header -->
  <h2>Projects</h2>
  <hr>

  <!-- If user not logged in -->
  <div v-if="!user" class="alert alert-warning" role="alert">You must log in to preview associated projects.</div>

  <!-- Warning Alert -->
  <div v-else-if="!user.attachedProjectId" class="alert alert-warning" role="alert">You dont have attached any project,
    select one from list below.
  </div>

  <!-- Success Alert -->
  <div v-else class="alert alert-primary" role="alert">One of the projects is already attached to your account.
    You can explore it in
    <router-link :to="Routes.PROJECT_ROUTE_RECORD.path">Project</router-link>
    tab or attach other one from list below.
  </div>

  <!-- Projects table -->
  <table class="table border border-1">
    <thead class="bg-dark text-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="project in allAssociatedProjects" :class="{ 'table-success': isAttached(project.id) }"
        :key="project.id.toString()">
      <td>{{ project.name }}</td>
      <td>{{ project.description }}</td>
      <td>
        <button class="btn btn-primary" :class="{ 'disabled btn-secondary': isAttached(project.id) }"
                @click="userStore.attachProject(project.id)">
          Attach
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped></style>