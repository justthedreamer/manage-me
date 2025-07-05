<script setup lang="ts">
import Kanban from "../../common/kanban/Kanban.vue";
import KanbanCol from "../../common/kanban/KanbanCol.vue";
import {storeToRefs} from "pinia";
import {useStoryKanbanStore} from "../../../stores/features/story/story-kanban-store.ts";
import StoryKanbanCard from "./StoryKanbanCard.vue";
import StoryToolbox from "../story-toolbox/StoryToolbox.vue";
import Selectable from "../../utils/Selectable.vue";
import {useStoryToolboxStore} from "../../../stores/features/story/story-toolbox-store.ts";

const storyKanbanStore = useStoryKanbanStore();
const {storyColumns} = storeToRefs(storyKanbanStore);
const toolboxStore = useStoryToolboxStore();
</script>

<template>
  <kanban title="Stories">
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
          @drop="storyKanbanStore.onStoryDropAsync($event, col.state)">
        <selectable v-for="story in col.stories"
                    :key="story.id.toString"
                    :selected="toolboxStore.story?.id === story.id"
                    @click="toolboxStore.setStory(story)">
          <story-kanban-card
              :story="story"
              draggable="true"
              @dragstart="storyKanbanStore.onStoryDrag($event, story)"/>
        </selectable>
      </kanban-col>
    </template>
  </kanban>
</template>
