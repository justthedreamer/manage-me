<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import {storeToRefs} from "pinia";
import StoriesKanban from "../components/story/kanban/StoriesKanban.vue";
import {useUserStore} from "../stores/user/UserStore.ts";

const userStore = useUserStore();
const {attachedProject} = storeToRefs(userStore);

</script>

<template>
  <div v-if="attachedProject" id="attached-project-wrapper">
    <header>
      <h2>{{ attachedProject.name }}</h2>
      <p>{{ attachedProject.description }}</p>
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