<script setup lang="ts">
import {useStoryToolboxStore} from "../../../stores/features/story/story-toolbox-store.ts";
import CreateStoryPopup from "../story-popups/CreateStoryPopup.vue";
import UpdateStoryPopup from "../story-popups/UpdateStoryPopup.vue";
import DeleteStoryPopup from "../story-popups/DeleteStoryPopup.vue";
import {useCreateStoryPopupStore} from "../../../stores/features/story/create-story-popup-store.ts";
import {useUpdateStoryPopupStore} from "../../../stores/features/story/update-story-form-popup-store.ts";
import {useDeleteStoryPopupStore} from "../../../stores/features/story/delete-story-popup-store.ts";

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