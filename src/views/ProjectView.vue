<script setup lang="ts">
import {Routes} from "../routing/Routes.ts";
import {useProjectStore} from "../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import StoryForm from "../components/story/StoryForm.vue";
import Card from "../components/ui/Card.vue";
import {useStoryFormStore} from "../stores/Story/StoryFormStore.ts";
import StoriesKanban from "../components/story/StoriesKanban.vue";

// stores
const projectStore = useProjectStore();
const storyFormStore = useStoryFormStore();

const {attachedProject} = storeToRefs(projectStore);
projectStore.syncAttachedProject()
</script>

<template>
  <div v-if="attachedProject" id="attached-project-wrapper">
    <story-form/>
    <header>
      <h2>{{ attachedProject.name }}</h2>
      <p>{{ attachedProject.description }}</p>
      <hr>
    </header>

    <card class="bg-highlight">
      <template v-slot:header-content>
        <h2>Stories</h2>
        <button class="btn btn-primary ms-auto"
                @click="storyFormStore.openCreateForm()">Add Story
        </button>
      </template>

      <template v-slot:main-content>
        <p v-if="!attachedProject.stories.length"
           class="text-center text-secondary fst-italic p-5">
          This project doesn't have any stories right now.
        </p>
        <stories-kanban v-else/>
      </template>
    </card>
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