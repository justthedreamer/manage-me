<script setup lang="ts">

import type {PropType} from "vue";

export type HoverEffect = "fade";

defineProps({
  effect: {
    type: String as PropType<HoverEffect>,
    required: true
  }
})

</script>

<template>
  <div class="hover-wrapper" :class="effect">
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

.hover-wrapper.fade:hover {
  opacity: 1;
}

.hover-wrapper.fade.off {
  opacity: 1;
}

</style>