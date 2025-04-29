<script setup lang="ts">

defineProps({
  selected: Boolean
})

</script>

<template>
  <div class="selectable border border-2 rounded" :class="{selected: selected}">
    <slot></slot>
  </div>
</template>

<style scoped>
.selectable {
  border-color: transparent !important;
  transition: .3s;
}

.selectable:hover {
  cursor: pointer;
  border-color: var(--bs-primary) !important;
}

.selectable.selected {
  border-color: var(--bs-primary) !important;
}
</style>