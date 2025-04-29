<script setup lang="ts">
import {useLoaderStore} from "../../stores/common/LoaderStore.ts";

const store = useLoaderStore();

</script>

<template>
  <div id="loader"
       class="spinner-border text-primary"
       role="status"
       aria-live="polite"
       aria-busy="true"
       :class="{'active':store.active}">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped>
#loader {
  position: fixed;
  right: -100px;
  bottom: 20px;
  transition: .3s;
}

#loader.active {
  right: 10px;
}
</style>