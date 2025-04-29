<script setup lang="ts">
import FullScreenWrapper from "../FullScreenWrapper.vue";

defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  active: Boolean
})

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>()

</script>

<template>
  <full-screen-wrapper class="bg-blur" v-if="active">
    <div :id="id"
         class="d-flex flex-column gap-1 border border-2 rounded shadow p-1 bg-white text-dark p-2"
         style="max-width: 50%">
      <header class="d-flex justify-content-between align-items-center fs-3 gap-1">
        <h4>{{ title }}</h4>
      </header>
      <hr class="m-0 p-0 mt-2 mb-2">
      <main class="text-danger">
        <slot name="message"></slot>
      </main>
      <footer class="d-flex justify-content-end gap-1">
        <button class="btn btn-sm btn-primary text-capitalize" @click="emit('cancel')">cancel</button>
        <button class="btn btn-sm btn-danger text-capitalize" @click="emit('confirm')">confirm</button>
      </footer>
    </div>
  </full-screen-wrapper>
</template>

<style scoped>
</style>