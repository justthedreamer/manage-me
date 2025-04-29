<script setup lang="ts">
import {WorkingState} from "../../../model/enums/WorkingState.ts";
import WorkingStateBadge from "../../badges/WorkingStateBadge.vue";
import Hover from "../../utils/Hover.vue";

interface Props {
  id: string;
  modelValue: WorkingState | null;
}

interface Emits {
  (e: 'update:modelValue', value: WorkingState): void;
}

defineProps<Props>()
const emit = defineEmits<Emits>()

function selectState(state: WorkingState): void {
  emit('update:modelValue', state);
}

</script>

<template>
  <div :id="id" class="d-flex flex-column gap-1 w-100">
    <label class="form-label mb-0" :for="id">State</label>
    <div class="d-flex form-control border-0 ps-0 gap-1">
      <hover v-for="state in WorkingState"
             :effect="'fade'"
             :disabled="modelValue === state"
             @click="selectState(state)">
        <working-state-badge :state="state"/>
      </hover>
    </div>
  </div>
</template>

<style scoped>

</style>