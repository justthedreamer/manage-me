<script setup lang="ts">
import type {PropType} from "vue";
import type {Story} from "../../../model/entities/Story.ts";
import PriorityBadge from "../../badges/PriorityBadge.vue";
import {formatDateToEuropean} from "../../../helpers/DateHelper.ts";
import {useRouter} from "vue-router";
import {Routes} from "../../../routing/Routes.ts";

const router = useRouter()

const props = defineProps({
  story: {
    type: Object as PropType<Story>,
    required: true,
  }
})

function goDetails() {
  router.push({name: Routes.PROJECT_STORY_ROUTE_RECORD.name, params: {id: props.story!.id.toString()}})
}

</script>

<template>
  <div class="border rounded bg-body shadow-sm w-100 p-2 p-2">
    <header class="d-flex justify-content-between align-items-center text-dark-emphasis gap-1">
      <p class="mb-0">{{ story.name }}</p>
      <priority-badge :priority="story.priority"/>
    </header>
    <hr>
    <footer class="d-flex justify-content-between align-items-center text-secondary">
      <div>
        <span>{{ formatDateToEuropean(story.createdAt) }}</span>
      </div>
      <span class="bi bi-arrow-bar-right" style="cursor: pointer" @click="goDetails" title="Go to details"></span>
    </footer>
  </div>
</template>

<style scoped>

</style>