<script setup lang="ts">
defineProps({
  hours: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <span class="badge bg-success">{{ hours }}H</span>
</template>

<style scoped>

</style>