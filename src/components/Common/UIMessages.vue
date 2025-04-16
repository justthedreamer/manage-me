<script setup lang="ts">
import {useUIMessageStore} from "../../stores/Common/UIMessageStore.ts";
import {storeToRefs} from "pinia";

const store = useUIMessageStore();
const {messages} = storeToRefs(store)

</script>

<template>
  <div>
    <template v-for="message in messages">
      <p v-if="message.type === 'success'"
         class="alert alert-success">
        {{ message.message }}
      </p>

      <p v-else-if="message.type === 'failure'"
         class="alert alert-danger">
        {{ message.message }}
      </p>
    </template>
  </div>
</template>

<style scoped>
div {
  position: fixed;
  right: 10px;
  top: 10px;
  max-width: 450px;
  height: 100vh;
  z-index: 1000 !important;
}
</style>