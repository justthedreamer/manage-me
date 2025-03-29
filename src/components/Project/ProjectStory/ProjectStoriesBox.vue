<script setup lang="ts">
import {computed, type PropType} from "vue";
import {ProjectStoryState} from "../../../model/enums/ProjectStoryState.ts";
import ProjectStoriesStateSection from "./ProjectStoriesCol.vue";
import {useProjectStore} from "../../../stores/Project/ProjectStore.ts";
import {storeToRefs} from "pinia";
import {onStoryDrop} from "./ProjectStoriesBoxDragAndDrop.ts";
import type {Project} from "../../../model/Project.ts";
import {ProjectStoryPriority} from "../../../model/enums/ProjectStoryPriority.ts";
import type {ProjectStory} from "../../../model/ProjectStory.ts";
import {useProjectStoryFormStore} from "../../../stores/Project/ProjectStoryFormStore.ts";

// props
defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})

// stores
const projectStore = useProjectStore();
const storyFormStore = useProjectStoryFormStore();

// refs
const {attachedProject} = storeToRefs(projectStore);

// sorting
function sortByPriority(s1: ProjectStory, s2: ProjectStory): number {
  if (s1.priority === ProjectStoryPriority.low) return 1;
  if (s2.priority === ProjectStoryPriority.high) return 2;
  return 0;
}

// computed
const storiesTodo = computed(() => {
  return attachedProject.value!.stories.filter((story) => story.state === ProjectStoryState.todo).sort(sortByPriority)
})

const storiesDoing = computed(() => {
  return attachedProject.value!.stories.filter((story) => story.state === ProjectStoryState.doing).sort(sortByPriority)
})

const storiesDone = computed(() => {
  return attachedProject.value!.stories.filter((story) => story.state === ProjectStoryState.done).sort(sortByPriority)
})
</script>

<template>
  <section>
    <div id="project-stories-toolbox"
         class="d-flex justify-content-between align-items-center w-100 gap-2 p-2 bg-dark rounded-top-1 "
         style="height: 60px">
      <h3 class="text-light">Stories</h3>
      <button class="btn btn-primary" @click="storyFormStore.openCreateForm()">Add Story</button>
    </div>

    <div id="project-stories-wrapper"
         class="bg-highlight border border-1 rounded-1">
      <div v-if="attachedProject!.stories.length"
           id="project-stories-box"
           class="container m-0 mw-100">
        <!--  To-do stories  -->
        <project-stories-state-section title="Todo"
                                       :stories="storiesTodo"
                                       @drop="onStoryDrop($event,ProjectStoryState.todo,attachedProject!.stories)"
                                       @dragover.prevent
                                       @dragenter.prevent
                                       class="project-stories-state-section overflow-y-scroll scroller bg-warning-subtle border-warning">
          <template v-slot:icon>
            <i class="bi bi-clock text-warning-emphasis fs-4"></i>
          </template>
        </project-stories-state-section>

        <!--  Doing Stories -->
        <project-stories-state-section title="Doing"
                                       :stories="storiesDoing"
                                       @drop="onStoryDrop($event,ProjectStoryState.doing,attachedProject!.stories)"
                                       @dragover.prevent
                                       @dragenter.prevent
                                       class="project-stories-state-section overflow-y-scroll scroller bg-primary-subtle border-primary">
          <template v-slot:icon>
            <i class="bi bi-clock-history text-primary-emphasis fs-4"></i>
          </template>
        </project-stories-state-section>

        <!--  Done Stories -->
        <project-stories-state-section title="Done"
                                       :stories="storiesDone"
                                       @drop="onStoryDrop($event,ProjectStoryState.done,attachedProject!.stories)"
                                       @dragover.prevent
                                       @dragenter.prevent
                                       class="project-stories-state-section overflow-y-scroll scroller bg-success-subtle border-success">
          <template v-slot:icon>
            <i class="bi bi-check-all text-success-emphasis fs-4"></i>
          </template>
        </project-stories-state-section>
      </div>

      <div v-else class="d-flex justify-content-center align-items-center h-100">
        <p class="text-secondary fst-italic">
          This project doesn't have any stories right now.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
#project-stories-wrapper {
  height: 50vh;
}

#project-stories-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  margin: 0 !important;
  gap: .5rem !important;
  padding: .5rem !important;
  justify-content: center;
}

.project-stories-state-section {
  padding: .5rem !important;
  min-height: 150px;
  max-height: 800px;
}

@media (max-width: 576px) {
  #project-stories-wrapper {
    height: auto;
  }

  #project-stories-box {
    display: flex;
    flex-direction: column;
    margin: 0 auto !important;
  }
}
</style>