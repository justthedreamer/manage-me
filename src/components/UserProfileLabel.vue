<script setup lang="ts">

import {useUserStore} from "../stores/UserStore.ts";
import {storeToRefs} from "pinia";
import type {User} from "../model/User.ts";

const userStore = useUserStore();

const {user} = storeToRefs(userStore) as User;
const {logout, login} = userStore;

</script>

<template>
  <div v-if="user"
       style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px">
    <span>{{ user.name }} {{ user.surname }}</span>
    <button @click="logout">Logout</button>
  </div>

  <div v-else id>
    <button @click="login">Login</button>
  </div>
</template>

<style scoped>
</style>