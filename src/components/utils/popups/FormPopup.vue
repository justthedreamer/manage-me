<script setup lang="ts">
import FullScreenWrapper from "../FullScreenWrapper.vue";
import CloseButton from "../buttons/CloseButton.vue";

interface Props {
  id: string,
  title: string,
  active: boolean,
  width: 'w-25' | 'w-50' | 'w-75' | 'w-100'
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit'): void
}>()
</script>

<template>
  <full-screen-wrapper
      class="bg-blur"
      v-if="active">
    <form @submit.prevent
          :id="id"
          class="d-flex flex-column gap-1 border border-2 rounded shadow p-1 bg-white text-dark p-2"
          :class="width">
      <header class="d-flex justify-content-between align-items-center fs-3">
        <h4>{{ title }}</h4>
        <close-button @click="emit('cancel')"></close-button>
      </header>
      <hr class="m-0 p-0 mt-2 mb-2">

      <main CLASS="d-flex flex-column gap-1">
        <slot name="description"></slot>
        <slot name="inputs"></slot>
      </main>

      <footer class="mt-1">
        <slot name="footer"></slot>
      </footer>

      <section class="d-flex justify-content-end gap-1 mt-">
        <button class="btn btn-sm btn-primary text-capitalize" @click="emit('cancel')">cancel</button>
        <button class="btn btn-sm btn-success text-capitalize" @click="emit('submit')">submit</button>
      </section>
    </form>
  </full-screen-wrapper>
</template>

<style scoped>

</style>