<script setup lang="ts">
import type {PropType} from "vue";

defineProps({
  closeHandler: {
    type: Function as PropType<(e : Event) => void>,
    required: true,
  }
})
</script>

<template>
  <i class="bi bi-x" @click="closeHandler" style="cursor: pointer;"/>
</template>

<style scoped>

</style>