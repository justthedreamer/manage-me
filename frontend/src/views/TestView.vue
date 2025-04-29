<script setup lang="ts">
import TextInput from "../components/form/inputs/TextInput.vue";
import {ref} from "vue";
import authClient from "../api/AuthClient.ts";

const login = ref<string>("")
const password = ref<string>("")

async function handleSubmit(): Promise<void> {
  const login = "admin"
  const password = "admin"

  await authClient.loginAsync({login, password})
}

async function me() {
  console.log(await authClient.getCurrentUserAsync())
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-25 bg-secondary-subtle p-2 rounded">
    <header>
      <h2>Sign in</h2>
    </header>
    <text-input id="login-form-login"
                label="Login"
                :model-value="login"
                error-message=""/>
    <text-input id="login-form-password"
                label="Password"
                :model-value="password"
                error-message=""/>
    <button type="submit" class="btn btn-primary me-1">Sign in</button>
    <button class="btn btn-primary" @click="me">Me</button>
  </form>

</template>

<style scoped>

</style>