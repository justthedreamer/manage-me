<script setup lang="ts">

import {computed, type PropType} from "vue";
import {Priority} from "../../model/enums/Priority.ts";
import {assertNever} from "../../helpers/Guards.ts";

const props = defineProps({
  priority: {
    type: String as PropType<Priority>,
    required: true
  }
})

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