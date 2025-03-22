<script setup lang="ts">
import type {ProjectStory} from "../../../model/ProjectStory.ts";
import ProjectStoryCard from "./ProjectStoryCard.vue";
import {onStoryDragStart} from "./ProjectStoriesBoxDragAndDrop.ts";

defineProps({
  title: {
    type: String,
    required: true
  },
  stories: {
    type: Array<ProjectStory>,
    required: true,
  }
})
</script>

<template>
  <section :id="'projects-'+title.toLocaleLowerCase()" class="border border-1 rounded-2">
    <header class="d-flex justify-content-between align-items-center">
      <h4 class="text-capitalize m-0">{{ title }}</h4>
      <slot name="icon"></slot>
    </header>
    <hr>
    <project-story-card v-for="story in stories"
                        :story="story"
                        draggable="true"
                        @dragstart="onStoryDragStart($event, story)"/>
  </section>
</template>