<script setup lang="ts">

import Kanban from "../kanban/Kanban.vue";
import KanbanCol from "../kanban/KanbanCol.vue";
import {useProjectStore} from "../../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {WorkingState} from "../../model/enums/WorkingState.ts";
import StoryKanbanCard from "./StoryKanbanCard.vue";
import type {Story} from "../../model/Story.ts";

const projectStore = useProjectStore();

const {attachedProject} = storeToRefs(projectStore);

const todoStories = computed(() => attachedProject.value?.stories.filter(story => story.state === WorkingState.TODO))
const doingStories = computed(() => attachedProject.value?.stories.filter(story => story.state === WorkingState.DOING))
const doneStories = computed(() => attachedProject.value?.stories.filter(story => story.state === WorkingState.DONE))

const DRAG_EVENT_STORY_ID_KEY = "StoryID";

function onStoryDrop(event: DragEvent, destinationState: WorkingState) {
  if (!event.dataTransfer) {
    throw new Error("Cannot process story drop event because data transfer is undefined.")
  }

  const storyId = event.dataTransfer.getData(DRAG_EVENT_STORY_ID_KEY)
  const story = attachedProject.value?.stories.find(story => story.id == storyId);

  if (!story) {
    throw new Error("Cannot handle project story drop event because story was not found.")
  }

  if (story.state !== destinationState) {
    story.state = destinationState;
  }

  projectStore.updateAttachedProject()
}

function onStoryDrag(event: DragEvent, story: Story) {
  if (!event.dataTransfer) {
    throw new Error("Cannot process story drag event because data transfer is undefined.")
  }

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData(DRAG_EVENT_STORY_ID_KEY, story.id.toString())
}

</script>

<template>
  <kanban v-if="attachedProject">
    <kanban-col title="Todo"
                class="bg-warning-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onStoryDrop($event,WorkingState.TODO)">
      <story-kanban-card v-for="story in todoStories"
                         :story="story"
                         draggable="true"
                         @dragstart="onStoryDrag($event,story)"/>
    </kanban-col>
    <kanban-col title="Doing"
                class="bg-primary-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onStoryDrop($event,WorkingState.DOING)">
      <story-kanban-card v-for="story in doingStories"
                         :story="story"
                         draggable="true"
                         @dragstart="onStoryDrag($event,story)"/>
    </kanban-col>
    <kanban-col title="Done"
                class="bg-success-subtle min-height"
                @dragover.prevent
                @dragenter.prevent
                @drop="onStoryDrop($event,WorkingState.DONE)">
      <story-kanban-card v-for="story in doneStories"
                         :story="story"
                         draggable="true"
                         @dragstart="onStoryDrag($event,story)"/>
    </kanban-col>
  </kanban>
</template>

<style scoped>
.min-height {
  min-height: 200px;
}
</style>