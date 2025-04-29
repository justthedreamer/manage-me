<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string;
  errorMessage: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

</script>

<template>
  <div class="d-flex flex-column">
    <label :for="id" class="form-label">{{ label }}</label>
    <input :id="id"
           type="text"
           class="form-control"
           :value="modelValue"
           @input="onInput">
    <p class="form-text text-danger">{{ errorMessage }}</p>
  </div>
</template>