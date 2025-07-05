<script setup lang="ts">
import TopNavbar from "./components/common/TopNavbar.vue";
import MaxWidthLimiter from "./components/utils/MaxWidthLimiter.vue";
import Loader from "./components/common/Loader.vue";
import UIMessages from "./components/features/ui-messages/UIMessages.vue";
import {onMounted} from "vue";
import userService from "./services/UserService.ts";
import UserAside from "./components/common/UserAside.vue";
import themeService from "./services/ThemeService.ts";
import {useProjectDataStore} from "./stores/data/project-data-store.ts";

onMounted(async () => {
  await userService.restoreUserStateAsync()
  useProjectDataStore().restore()
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
