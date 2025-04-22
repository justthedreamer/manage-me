<script setup lang="ts">
defineProps({
  title : {
    type: String,
    required: true,
  }
})
</script>

<template>
  <h2 class="text-dark-emphasis">{{title}}</h2>
</template>

<style scoped>

</style>