<script setup lang="ts">
import type {PropType} from "vue";
import {Priority} from "../../../model/enums/Priority.ts";
import FormSubtitle from "../utils/FormSubtitle.vue";
import PriorityBadge from "../../common/PriorityBadge.vue";
import Hover from "../../ui/Hover.vue";

defineProps({
  stateRef: {
    type: Object as PropType<Priority>,
    required: true,
  },
  selectCb: {
    type: Function as PropType<(priority : Priority) => void>,
    required: true
  }
})
</script>
  
<template>
  <div class="form-priority-input d-flex flex-column">
    <form-subtitle title="Priority" />
    <div class="d-flex gap-1">
      <hover v-for="priority in Priority"
             effect="fade"
             class="pointer"
             :class="{off: stateRef === priority}"
             @click="selectCb(priority)">
        <priority-badge :priority="priority"/>
      </hover>
    </div>
  </div>
</template>
