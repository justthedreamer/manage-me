<script setup lang="ts">
import TextInput from "./form/inputs/TextInput.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useLoaderStore} from "../stores/common/LoaderStore.ts";
import authClient from "../api/AuthClient.ts";
import {useUserStore} from "../stores/user/UserStore.ts";
import {Routes} from "../routing/Routes.ts";

const router = useRouter();
const login = ref<string>("")
const password = ref<string>("")
const errorMessage = ref<string>("")

async function handleSubmit(): Promise<void> {
  const loaderState = useLoaderStore()
  loaderState.activate();
  const error = await authClient.loginAsync(login.value, password.value);
  loaderState.deactivate()

  if (error) {
    errorMessage.value = error;
  } else {
    const user = await authClient.getCurrentUserAsync()
    useUserStore().setUser(user)
    await router.push(Routes.PROJECT_ROUTE_RECORD);
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-50 bg-secondary-subtle rounded shadow p-3 m-auto">
    <h2 class="">Sign In</h2>
    <hr>
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