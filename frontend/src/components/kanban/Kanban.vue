<script setup lang="ts">
interface Props {
  title: string,
}

defineProps<Props>()

</script>

<template>
  <div class="kanban d-flex flex-column border border-1 rounded bg-highlight d-flex gap-1">
    <header class="d-flex justify-content-between align-items-center bg-dark rounded-top text-white p-2">
      <h3>{{ title }}</h3>
      <slot name="toolbox"></slot>
    </header>
    <main class="d-flex gap-1 p-2">
      <slot name="body"></slot>
    </main>
    <footer class="d-flex gap-1">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.kanban {
  min-height: 600px;
}

main > * {
  height: 100vh;
}


@media (max-width: 720px) {
  main {
    flex-direction: column;
  }
}
</style>