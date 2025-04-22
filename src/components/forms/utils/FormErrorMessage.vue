<script setup lang="ts">
defineProps({
  stateRef: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <p class="text-danger mb-1">{{stateRef}}</p>
</template>

<style scoped>
  p{
    transition: .3s;
  }
</style>