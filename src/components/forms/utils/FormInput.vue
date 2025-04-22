<script setup lang="ts">
import {ref, watch} from 'vue'
import type {InputTypeHTMLAttribute, PropType} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<InputTypeHTMLAttribute>,
    required: true,
  },
  placeholder: String,
  required: Boolean,
  onInput: Function as PropType<(event: Event) => void>
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localValue.value = val
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  props.onInput?.(event)
}
</script>

<template>
  <input
      :type="type"
      class="rounded p-1 ps-2 pe-2"
      :placeholder="placeholder"
      :required="required"
      :value="localValue"
      @input="handleInput"
  />
</template>

<style scoped>
input {
  border: 1px solid var(--bs-secondary-bg-subtle);
  color: var(--bs-secondary);
  transition: .3s;
  stroke: none;
  outline: none;
}

input:hover,
input:focus {
  border: 1px solid var(--bs-primary);
  cursor: pointer;
}
</style>
