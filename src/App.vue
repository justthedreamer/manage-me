<script setup lang="ts">
import TopNavbar from "./components/Navigation/TopNavbar.vue";
import UiMessages from "./components/Common/UIMessages.vue";
import MaxWidthLimiter from "./components/Common/MaxWidthLimiter.vue";
</script>
<template>
  <top-navbar/>
  <ui-messages/>
  <max-width-limiter>
    <main class="m-4">
      <router-view/>
    </main>
  </max-width-limiter>
</template>
