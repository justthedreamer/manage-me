<script setup lang="ts">
import {computed, type PropType} from "vue";
import type {ProjectStory} from "../../../model/ProjectStory.ts";
import {ProjectStoryPriority} from "../../../model/enums/ProjectStoryPriority.ts";
import {assertNever} from "../../../helpers/SwitchHelper.ts";
import {formatDateToEuropean} from "../../../helpers/DateHelper.ts";
import {ProjectStoryState} from "../../../model/enums/ProjectStoryState.ts";
import {useProjectStoryFormStore} from "../../../stores/Project/ProjectStoryFormStore.ts";

// stores
const storyFormStore = useProjectStoryFormStore()

// props
const props = defineProps({
  story: {
    type: Object as PropType<ProjectStory>,
    required: true,
  }
})

// card utilities
const cardUtils = computed(() => {
  switch (props.story!.priority) {
    case ProjectStoryPriority.low: {
      return {
        border: "border border-success",
        badge: "badge text-bg-success",
      };
    }
    case ProjectStoryPriority.medium: {
      return {
        border: "border border-warning",
        badge: "badge text-bg-warning",
      };
    }
    case ProjectStoryPriority.high: {
      return {
        border: "border border-danger",
        badge: "badge text-bg-danger",
      };
    }
    default:
      assertNever(props.story!.priority);
  }
})

// is story done state check.
const isDone = computed(() => {
  return props.story!.state === ProjectStoryState.done
})

</script>

<template>
  <div :class="cardUtils.border, {'opacity-75' : isDone}" class="card mb-3">
    <div class="card-header d-flex justify-content-between">
      {{ story.name }}
      <span class="badge align-self-center" :class="cardUtils.badge">{{ story.priority }}</span>
    </div>
    <div class="card-body">{{ story.description }}</div>
    <div :class="cardUtils.border"
         class="d-flex justify-content-between card-footer border-bottom-0 border-start-0 border-end-0">
      <span class="text-secondary">{{ formatDateToEuropean(story.createdAt) }}</span>
      <i class="bi bi-pencil-square" style="cursor: pointer" @click="storyFormStore.openUpdateForm(story)"></i>
    </div>
  </div>
</template>