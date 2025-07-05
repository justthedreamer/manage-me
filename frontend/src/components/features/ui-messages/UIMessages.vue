<script setup lang="ts">
import {useUIMessageStore} from "../../../stores/features/ui-message-store.ts";
import {storeToRefs} from "pinia";
import {UIMessage, UIMessageType} from "./UIMessage.ts";
import {assertNever} from "../../../helpers/Guards.ts";

const store = useUIMessageStore();
const {messages} = storeToRefs(store)

function getMessageAlertClass(message: UIMessage) {
  switch (message.type) {
    case UIMessageType.ERROR: {
      return "alert-danger"
    }
    case UIMessageType.SUCCESS: {
      return "alert-success"
    }
    default: {
      assertNever(message.type)
    }
  }
}

function disableMessage(event: Event) {
  const target = event.target as HTMLParagraphElement;
  target.classList.add("disabled");
}

</script>

<template>
  <div class="d-flex flex-column">
    <template v-for="message in messages">
      <p class="alert pointer" :class="getMessageAlertClass(message)" @click="disableMessage($event)">{{
          message.message
        }}</p>
    </template>
  </div>
</template>

<style scoped>
div {
  position: fixed;
  right: 10px;
  top: 10px;
  max-width: 450px;
  z-index: 999 !important;
}

p {
  opacity: 0.8;
}

p:hover {
  opacity: 1;
}

p.disabled {
  display: none !important;
}
</style>