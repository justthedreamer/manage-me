<script setup lang="ts">
import TopNavbar from "./components/navigation/TopNavbar.vue";
import UiMessages from "./components/common/UIMessages.vue";
import MaxWidthLimiter from "./components/utils/MaxWidthLimiter.vue";
import {useUserStore} from "./stores/user/UserStore.ts";

useUserStore().fetchAttachedProject()

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
