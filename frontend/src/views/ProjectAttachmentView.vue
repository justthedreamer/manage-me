<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import {useUserStore} from "../stores/user/UserStore.ts";
import {storeToRefs} from "pinia";
import type {UUIDTypes} from "uuid";

const userStore = useUserStore();
const {user, attachedProject, associatedProjects} = storeToRefs(userStore);

function isAttachedProject(projectId: string): boolean {
  return attachedProject.value?.id === projectId;
}

function projectRowClass(projectId: UUIDTypes): string {
  return isAttachedProject(projectId.toString()) ? "table-success" : "";
}

function buttonClass(projectId: UUIDTypes): string {
  return isAttachedProject(projectId.toString()) ? "btn btn-secondary disabled" : "btn btn-primary";
}

function canAttachProject(projectId: UUIDTypes): boolean {
  return !isAttachedProject(projectId.toString());
}
</script>

<template>
  <h2>Projects</h2>
  <hr/>

  <div v-if="!user" class="alert alert-warning" role="alert">
    You must log in to preview associated projects.
  </div>

  <div v-else-if="!user.attachedProjectId" class="alert alert-warning" role="alert">
    You don't have any attached project. Select one from the list below.
  </div>

  <div v-else class="alert alert-primary" role="alert">
    One of the projects is already attached to your account.
    You can explore it in
    <router-link :to="Routes.PROJECT_ROUTE_RECORD.path">Project</router-link>
    tab or attach another one from the list below.
  </div>

  <table v-if="user" class="table border border-1 mt-3">
    <thead class="bg-dark text-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="project in associatedProjects"
        :key="project.id.toString()"
        :class="projectRowClass(project.id)">
      <td>{{ project.name }}</td>
      <td>{{ project.description }}</td>
      <td>
        <button
            :class="buttonClass(project.id)"
            @click="canAttachProject(project.id) && userStore.attachProject(project.id)">
          Attach
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
