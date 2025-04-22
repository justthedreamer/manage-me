<script setup lang="ts">
import {DoingTask, DoneTask, TodoTask} from "../model/Task.ts";
import {computed, type PropType} from "vue";
import type {UUIDTypes} from "uuid";
import {useProjectStore} from "../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import {Routes} from "../routing/Routes.ts";
import {useStoryFormStore} from "../stores/Story/StoryFormStore.ts";
import StoryForm from "../components/story/StoryForm.vue";
import PriorityBadge from "../components/common/PriorityBadge.vue";
import WorkingStateBadge from "../components/badges/WorkingStateBadge.vue";
import Card from "../components/ui/Card.vue";
import TaskKanban from "../components/task/TaskKanban.vue";
import CreateTaskForm from "../components/task/CreateTaskForm.vue";
import {useCreateTaskFormStore} from "../stores/Task/CreateTaskFormStore.ts";

const projectStore = useProjectStore()
const storyFormStore = useStoryFormStore()
const createTaskFormStore = useCreateTaskFormStore();

const {attachedProject} = storeToRefs(projectStore)
projectStore.syncAttachedProject()

const props = defineProps({
  id: {
    type: String as PropType<UUIDTypes>,
    required: true
  }
})

const story = computed(() => {
  return attachedProject.value?.stories.find(story => story.id === props.id)
})
</script>

<template>
  <div v-if="story">
    <story-form/>
    <header class="d-flex align-items-center">
      <h2>{{ attachedProject?.name }} Story</h2>
      <span class="bi bi-pencil ms-auto text-secondary"
            style="cursor: pointer"
            @click="storyFormStore.openUpdateForm(story)"></span>
    </header>

    <hr/>

    <section class="mb-3 ms-1 me-1">
      <h3>{{ story.name }}</h3>
      <span class="d-flex gap-1">
        <priority-badge :priority="story.priority"/>
        <working-state-badge :state="story.state"/>
      </span>
    </section>

    <section class="card p-2">
      <span class="m-0">Description</span>
      <hr>
      <p>{{ story.description }}</p>
    </section>

    <section class="mt-4">
      <create-task-form/>
      <card>
        <template v-slot:header-content>
          <h4>Tasks</h4>
          <button class="btn btn-sm btn-primary ms-auto"
                  @click="createTaskFormStore.open(story)">New Task
          </button>
        </template>
        <template v-slot:main-content>
          <task-kanban :story="story"/>
        </template>
      </card>
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