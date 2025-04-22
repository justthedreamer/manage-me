<script setup lang="ts">
import type {PropType} from "vue";
import FormTitle from "./utils/FormTitle.vue";
import FormCloseButton from "./utils/FormCloseButton.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  closeHandler: {
    type: Function as PropType<(e : Event) => void>,
    required: true,
  },
  submitHandler: {
    type : Function as PropType<(e : Event) => void>,
    required: true,
  }
})
</script>

<template>
  <form class=" border border-1 bg-white shadow-sm rounded-2 ps-2 pe-2" @submit.prevent="submitHandler($event)">
    <header class="d-flex justify-content-between align-items-center text-secondary w-100 p-1 fs-1">
      <form-title :title="title"/>
      <form-close-button :closeHandler="closeHandler"/>
    </header>
    
    <hr class="m-0">
    
    <main class="p-2">
      <slot name="inputs"></slot>
      <slot name="controls"></slot>
    </main>
    
    <footer class="p-2">
      <slot name="footer"></slot>
    </footer>
  </form>
</template>

<style scoped>
</style>