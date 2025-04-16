<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div class="overflow-y-scroll scroller border border-1 rounded w-100 p-1">
    <span>{{ title }}</span>
    <hr>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  max-height: 600px;
}
</style>