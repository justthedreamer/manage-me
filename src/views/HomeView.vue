<script setup lang="ts">
import Logo from "../components/common/Logo.vue";
</script>

<template>
  <div class="d-flex flex-column w-100 align-items-center mt-5">
    <logo :theme="'text-dark'"/>
    <p class="text-center">Is an open-source project management tool crafted in vue.js framework.</p>
    <a href="https://github.com/justthedreamer/manage-me" class="text-decoration-none text-dark">
      <i class="bi bi-github fs-4"></i></a>
  </div>
</template>