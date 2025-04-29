<script setup lang="ts">
import TextInput from "../components/form/inputs/TextInput.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import Logo from "../components/common/Logo.vue";
import userService from "../services/UserService.ts";
import {Routes} from "../routing/Routes.ts";

const router = useRouter();
const login = ref<string>("")
const password = ref<string>("")
const errorMessage = ref<string>("")

async function handleSubmit(): Promise<void> {
  const error = await userService.loginAsync(login.value, password.value);

  if (error) {
    errorMessage.value = error;
  } else {
    await router.push(Routes.PROJECT_ROUTE_RECORD);
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-50 bg-secondary-subtle rounded shadow p-3 m-auto">
    <logo theme="text-dark" class="text-center mb-3"/>
    <hr/>
    <text-input id="login-form-login"
                label="Login"
                v-model="login"
                placeholder="Enter you login..."/>

    <text-input id="login-form-password"
                type="password"
                label="Password"
                v-model="password"
                placeholder="Enter your password..."/>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    <button class="btn btn-primary w-100" type="submit">
      <span class="sr-only">Sign in</span>
    </button>
  </form>
</template>