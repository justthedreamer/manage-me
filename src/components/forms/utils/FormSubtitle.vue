<script setup lang="ts">
defineProps({
  title : {
    type: String,
    required: true,
  }
})
</script>

<template>
  <h3 class="text-secondary fs-4">{{title}}</h3>
</template>
