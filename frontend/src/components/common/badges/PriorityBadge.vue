<script setup lang="ts">

import {computed} from "vue";
import {Priority} from "../../../enums/Priority.ts";
import {assertNever} from "../../../helpers/Guards.ts";

interface Props {
  priority: Priority;
}

const props = defineProps<Props>()

const utilities = computed(() => {
  switch (props.priority) {
    case Priority.LOW: {
      return {
        badge: "badge text-bg-success",
      };
    }
    case Priority.MEDIUM: {
      return {
        badge: "badge text-bg-warning",
      };
    }
    case Priority.HIGH: {
      return {
        badge: "badge text-bg-danger",
      };
    }
    default:
      assertNever(props.priority);
  }
})

</script>

<template>
  <span class="badge align-self-center" :class="utilities.badge">{{ priority }}</span>
</template>