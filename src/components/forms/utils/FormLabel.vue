<script setup lang="ts">
defineProps({
  inputId:{
    type: String,
    required: true,
  }
})
</script>

<template>
  <label class="text-secondary fs-5" :for="inputId">
    <slot></slot>
  </label>
</template>