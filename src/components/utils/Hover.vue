<script setup lang="ts">
interface Props {
  effect: 'fade'
  disabled: boolean;
}

defineProps<Props>()

</script>

<template>
  <div class="hover-wrapper pointer" :class="effect, {'off': disabled}">
    <slot></slot>
  </div>
</template>

<style scoped>
.hover-wrapper {
  display: inline-block;
  margin: 0 !important;
  padding: 0 !important;
}

.hover-wrapper.fade {
  opacity: 0.5;
}

.hover-wrapper.fade:hover,
.hover-wrapper.fade.off {
  opacity: 1;
}

</style>