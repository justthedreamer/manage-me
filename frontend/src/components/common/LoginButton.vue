<script setup lang="ts">
import {useRouter} from "vue-router";
import {Routes} from "../../routing/Routes.ts";

const router = useRouter()

</script>

<template>
  <button class="btn btn-primary" @click="router.push(Routes.LOGIN_ROUTE_RECORD)">Sign in</button>
</template>

<style scoped>

</style>