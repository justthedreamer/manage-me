<script setup lang="ts">
import type {PropType} from "vue";
import {WorkingState} from "../../../model/enums/WorkingState.ts";
import FormSubtitle from "../utils/FormSubtitle.vue";
import Hover from "../../ui/Hover.vue";
import WorkingStateBadge from "../../badges/WorkingStateBadge.vue";

defineProps({
  stateRef: {
    type: Object as PropType<WorkingState>,
    required: true,
  },
  selectCb: {
    type: Function as PropType<(state : WorkingState) => void>,
    required: true
  }
})
</script>

<template>
  <div class="form-working-state-input d-flex flex-column">
    <form-subtitle title="State" />
    <div class="d-flex gap-1">
      <hover v-for="state in WorkingState"
             effect="fade"
             class="pointer"
             :class="{off: stateRef === state}"
             @click="selectCb(state)">
        <working-state-badge :state="state"/>
      </hover>
    </div>
  </div>
</template>

<style scoped>

</style>