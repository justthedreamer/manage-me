<script setup lang="ts">
import {computed} from "vue";
import type {UUIDTypes} from "uuid";
import {Routes} from "../routing/Routes.ts";
import PriorityBadge from "../components/badges/PriorityBadge.vue";
import WorkingStateBadge from "../components/badges/WorkingStateBadge.vue";
import TasksKanban from "../components/task/kanban/TasksKanban.vue";
import {useUserStore} from "../stores/user/UserStore.ts";
import {storeToRefs} from "pinia";

interface Props {
  id: UUIDTypes
}

const props = defineProps<Props>()

const userStore = useUserStore();
const {attachedProject} = storeToRefs(userStore)

const story = computed(() => {
  return attachedProject.value?.stories.find(story => story.id === props.id)
})
</script>

<template>
  <div v-if="story && attachedProject">
    <header id="story-header" class="d-flex align-items-center">
      <h2>{{ attachedProject.name }} Story</h2>
    </header>
    <hr/>
    <section id="story-details">
      <div class="mb-3 ms-1 me-1">
        <h3>{{ story.name }}</h3>
        <span class="d-flex gap-1">
        <priority-badge :priority="story.priority"/>
        <working-state-badge :state="story.state"/>
      </span>
      </div>
      <div class="card p-2">
        <span class="m-0">Description</span>
        <hr>
        <p>{{ story.description }}</p>
      </div>
    </section>

    <section id="story-tasks" class="mt-4">
      <tasks-kanban :story="story"/>
    </section>
  </div>
  <p v-else
     class="alert alert-warning">
    Searching story was not found.
    <a :href="Routes.PROJECT_ROUTE_RECORD.path">Return to project view.</a>
  </p>
</template>

<style scoped>

</style>