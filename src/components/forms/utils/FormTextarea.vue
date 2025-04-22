<script setup lang="ts">
import {defineProps, defineEmits, ref, watch, type PropType} from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  cols: Number,
  rows: Number,
  placeholder: String,
  required: Boolean,
  onInput: Function as PropType<(event: Event) => void>,
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

const handleInput = (e: Event) => {
  const newValue = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', newValue)
  props.onInput?.(e)
}
</script>

<template>
  <textarea
      v-model="localValue"
      :cols="cols"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      @input="handleInput"
      class="rounded p-1 ps-2 pe-2">
    
  </textarea>
</template>

<style scoped>
textarea {
  border: 1px solid var(--bs-secondary-bg-subtle);
  color: var(--bs-secondary);
  transition: .3s;
  stroke: none;
  outline: none;
}

textarea:hover,
textarea:focus {
  border: 1px solid var(--bs-primary);
  cursor: pointer;
}
</style>