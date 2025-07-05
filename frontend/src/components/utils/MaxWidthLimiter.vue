<script setup lang="ts">
defineProps({
  maxWidth: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="m-0 m-auto h-100"
       :style="{'max-width': maxWidth ? `${maxWidth} !important` : '1440px !important'}">
    <slot></slot>
  </div>
</template>