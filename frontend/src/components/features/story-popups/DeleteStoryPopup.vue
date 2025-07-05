<script setup lang="ts">
import ConfirmPopup from "../../common/popup/ConfirmPopup.vue";
import {useDeleteStoryPopupStore} from "../../../stores/features/story/delete-story-popup-store.ts";

const story = useDeleteStoryPopupStore();

</script>

<template>
  <confirm-popup id="delete-story-popup"
                 title="Delete story"
                 :active="story.opened"
                 @cancel="story.close"
                 @confirm="story.delete">
    <template v-slot:message>
      <p>Are you sure you want to delete this story? This actions is permanent.</p>
    </template>
  </confirm-popup>
</template>