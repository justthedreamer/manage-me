<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Routes} from "../routing/Routes.ts";
import PriorityBadge from "../components/common/badges/PriorityBadge.vue";
import WorkingStateBadge from "../components/common/badges/WorkingStateBadge.vue";
import TasksKanban from "../components/features/task-kanban/TasksKanban.vue";
import storyService from "../services/StoryService.ts";
import type {Story} from "../types/Story.ts";
import {storeToRefs} from "pinia";
import {useProjectDataStore} from "../stores/data/project-data-store.ts";
import type {Task} from "../types/Task.ts";
import taskService from "../services/TaskService.ts";

interface Props {
  storyId: string,
}

const props = defineProps<Props>()

const story = ref<Story | null>(null)
const tasks = ref<Task[]>([])
const {currentProjectId} = storeToRefs(useProjectDataStore())

onMounted(async () => {
  if (!currentProject.value?.id) {
    throw new Error("Project is not attached")
  }
  const fetchedStory = await storyService.getByIdAsync(currentProject.value.id, props.storyId)
  const fetchedTasks = await taskService.getAllAsync(currentProject.value.id, fetchedStory.id)
  story.value = fetchedStory
  tasks.value = fetchedTasks
})

</script>

<template>
  <div v-if="story">
    <header id="story-header" class="d-flex align-items-center">
      <h2>{{ story.name }} Story</h2>
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
      <tasks-kanban :story-id="storyId" :tasks="tasks"/>
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