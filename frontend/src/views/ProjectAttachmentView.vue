<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import {useUserStore} from "../stores/user/UserStore.ts";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {user, attachedProject, associatedProjects} = storeToRefs(userStore);

</script>

<template>
  <h2>Projects</h2>
  <hr>

  <div v-if="!user" class="alert alert-warning" role="alert">You must log in to preview associated projects.</div>

  <div v-else-if="!user.attachedProjectId" class="alert alert-warning" role="alert">You dont have attached any project,
    select one from list below.
  </div>

  <div v-else class="alert alert-primary" role="alert">One of the projects is already attached to your account.
    You can explore it in
    <router-link :to="Routes.PROJECT_ROUTE_RECORD.path">Project</router-link>
    tab or attach other one from list below.
  </div>

  <table class="table border border-1">
    <thead class="bg-dark text-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="project in associatedProjects"
        :class="{ 'table-success': attachedProject?.id === project.id }"
        :key="project.id.toString()">
      <td>{{ project.name }}</td>
      <td>{{ project.description }}</td>
      <td>
        <button class="btn btn-primary"
                :class="{ 'disabled btn-secondary': attachedProject?.id === project.id }"
                @click="userStore.attachProject(project.id)">
          Attach
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>