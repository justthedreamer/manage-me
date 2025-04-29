<script setup lang="ts">
import {Priority} from "../../../model/enums/Priority.ts";
import PriorityBadge from "../../badges/PriorityBadge.vue";
import Hover from "../../utils/Hover.vue";

interface Props {
  id: string;
  modelValue: Priority;
}

interface Emits {
  (e: 'update:modelValue', value: Priority): void;
}

defineProps<Props>()
const emit = defineEmits<Emits>()

function selectPriority(priority: Priority): void {
  emit('update:modelValue', priority);
}

</script>

<template>
  <div :id="id" class="w-100">
    <label class="d-block form-label" :for="id">Priority</label>
    <hover v-for="priority in Priority"
           :effect="'fade'"
           :disabled="modelValue === priority">
      <priority-badge :priority="priority"
                      @click="selectPriority(priority)"
                      class="me-1"/>
    </hover>
  </div>
</template>