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
    <div class="kanban-items d-flex flex-column gap-1">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
div {
  max-height: 600px;
}
</style>