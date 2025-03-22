<script setup lang="ts">
defineProps({
  maxWidth: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div style="margin: 0 auto" :style="{'max-width': maxWidth ? `${maxWidth} !important` : '1440px !important'}">
    <slot></slot>
  </div>
</template>