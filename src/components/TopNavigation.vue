<script setup lang="ts">

import UserProfileLabel from "./UserProfileLabel.vue";
</script>

<template>
  <nav>
    <h1 id="logo">MANAGE!ME</h1>
    <UserProfileLabel/>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 1rem;
}

h1 {
  font-size: 2rem;
}
</style>