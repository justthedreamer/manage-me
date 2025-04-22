<script setup lang="ts">

</script>

<template>
  <div class="kanban border border-1 rounded p-2 bg-highlight d-flex gap-1">
    <slot></slot>
  </div>
</template>

<style scoped>
.kanban {
  min-height: 600px;
}

@media (max-width: 720px) {
  .kanban {
    flex-direction: column;
  }
}
</style>