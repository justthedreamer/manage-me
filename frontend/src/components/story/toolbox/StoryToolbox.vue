<script setup lang="ts">
import {useStoryToolboxStore} from "../../../stores/story/StoryToolboxStore.ts";
import CreateStoryPopup from "../popups/CreateStoryPopup.vue";
import UpdateStoryPopup from "../popups/UpdateStoryPopup.vue";
import DeleteStoryPopup from "../popups/DeleteStoryPopup.vue";
import {useCreateStoryPopupStore} from "../../../stores/story/popups/CreateStoryPopupStore.ts";
import {useUpdateStoryPopupStore} from "../../../stores/story/popups/UpdateStoryFormPopupStore.ts";
import {useDeleteStoryPopupStore} from "../../../stores/story/popups/DeleteStoryPopupStore.ts";

const store = useStoryToolboxStore()

const createStoryPopupStore = useCreateStoryPopupStore();
const updateStoryPopupStore = useUpdateStoryPopupStore();
const deleteStoryPopupStore = useDeleteStoryPopupStore();

</script>

<template>
  <div class="d-flex flex-row-reverse justify-content-start gap-1 w-100">
    <create-story-popup/>
    <button class="btn btn-sm btn-primary" @click="createStoryPopupStore.open">New story</button>
    <template v-if="store.story">
      <update-story-popup/>
      <button class="btn btn-sm btn-success" @click="updateStoryPopupStore.open(store.story)">Update</button>
      <delete-story-popup/>
      <button class="btn btn-sm btn-danger" @click="deleteStoryPopupStore.open(store.story)">Delete</button>
    </template>
  </div>
</template>