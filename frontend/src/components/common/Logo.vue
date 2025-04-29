<script setup lang="ts">
import type {PropType} from "vue";

export type LogoThemeType = "text-dark" | "text-light";

defineProps({
  theme: {
    type: String as PropType<LogoThemeType>,
    required: true,
  }
})

</script>

<template>
  <div class="logo">
    <h1
        :class="theme"
        class="text-uppercase">
      manage<span class="text-primary fw-bold">!</span>me
    </h1>
  </div>
</template>