<script setup lang="ts">
import TopNavbar from "./components/navigation/TopNavbar.vue";
import MaxWidthLimiter from "./components/utils/MaxWidthLimiter.vue";
import Loader from "./components/common/Loader.vue";
import UIMessages from "./components/common/UIMessages.vue";
import {onMounted} from "vue";
import userService from "./services/UserService.ts";
import UserAside from "./components/navigation/UserAside.vue";
import themeService from "./services/ThemeService.ts";

onMounted(async () => {
  await userService.restoreUserStateAsync()
  themeService.restoreTheme()
})

</script>

<template>
  <top-navbar/>
  <user-aside/>
  <u-i-messages/>
  <loader/>
  <max-width-limiter>
    <main class="m-4">
      <router-view/>
    </main>
  </max-width-limiter>
</template>
