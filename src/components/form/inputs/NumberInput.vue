<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: number;
  errorMessage: string;
  width: 'w-25' | 'w-50' | 'w-75' | 'w-100';
  unit?: string;
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', parseInt(target.value));
}

</script>

<template>
  <div class="d-flex flex-column">
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="d-flex align-items-center">
      <input :id="id"
             type="number"
             class="form-control"
             :class="width"
             :value="modelValue"
             @input="onInput">
      <span v-if="unit" class="ms-1 text-capitalize">{{ unit }}</span>
    </div>
    <p class="form-text text-danger">{{ errorMessage }}</p>
  </div>
</template>