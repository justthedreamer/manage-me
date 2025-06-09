<script setup lang="ts">
import Kanban from "../../kanban/Kanban.vue";
import KanbanCol from "../../kanban/KanbanCol.vue";
import {storeToRefs} from "pinia";
import {useStoryKanbanStore} from "../../../stores/story/StoryKanbanStore.ts";
import StoryKanbanCard from "./StoryKanbanCard.vue";
import StoryToolbox from "../toolbox/StoryToolbox.vue";
import Selectable from "../../utils/Selectable.vue";
import {useStoryToolboxStore} from "../../../stores/story/StoryToolboxStore.ts";

const store = useStoryKanbanStore();
const {storyColumns} = storeToRefs(store);
const toolboxStore = useStoryToolboxStore();
</script>

<template>
  <kanban v-if="store.attachedProject" title="Stories">
    <template v-slot:toolbox>
      <story-toolbox/>
    </template>
    <template v-slot:body>
      <kanban-col
          v-for="col in storyColumns"
          :key="col.title"
          :title="col.title"
          :class="[col.class, 'min-height']"
          @dragover.prevent
          @dragenter.prevent
          @drop="store.onStoryDrop($event, col.state)">
        <selectable v-for="story in col.stories"
                    :key="story.id.toString"
                    :selected="toolboxStore.story?.id === story.id"
                    @click="toolboxStore.setStory(story)">
          <story-kanban-card
              :story="story"
              draggable="true"
              @dragstart="store.onStoryDrag($event, story)"/>
        </selectable>
      </kanban-col>
    </template>
  </kanban>
</template>
