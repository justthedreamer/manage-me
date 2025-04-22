<script setup lang="ts">
import {computed, type PropType} from "vue";
import {WorkingState} from "../../model/enums/WorkingState.ts";
import {assertNever} from "../../helpers/SwitchHelper.ts";

const props = defineProps({
  state: {
    type: String as PropType<WorkingState>,
    required: true,
  }
})

const utilities = computed(() => {
  switch (props.state) {
    case WorkingState.TODO: {
      return {
        badge: "badge text-bg-warning",
      };
    }
    case WorkingState.DOING: {
      return {
        badge: "badge text-bg-primary",
      };
    }
    case WorkingState.DONE: {
      return {
        badge: "badge text-bg-success",
      };
    }
    default:
      assertNever(props.state);
  }
})
</script>

<template>
  <span class="badge align-self-center" :class="utilities.badge">{{ state }}</span>
</template>

<style scoped>

</style>