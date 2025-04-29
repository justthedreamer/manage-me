<script setup lang="ts">
interface Props {
  theme: 'text-dark' | 'text-light',
}

defineProps<Props>()

</script>

<template>
  <h1 class="text-uppercase">
    <span :class="theme">manage</span>
    <span class="text-primary fw-bold">!</span>
    <span :class="theme">me</span>
  </h1>
</template>