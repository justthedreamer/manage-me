<script setup lang="ts">

</script>

<template>
  <div class="w-100 h-100">
    <header class="d-flex bg-dark text-light rounded-top-1 align-items-center p-2 w-100">
      <slot name="header-content"></slot>
    </header>
    <main class="border border-1">
      <slot name="main-content"></slot>
    </main>
    <footer>
      <slot name="footer-content"></slot>
    </footer>
  </div>
</template>

<style scoped>

</style>