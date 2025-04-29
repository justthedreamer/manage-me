<script setup lang="ts">

import {useUserStore} from "../../stores/user/UserStore.ts";
import {storeToRefs} from "pinia";

const userStore = useUserStore();

const {user} = storeToRefs(userStore);
const {logout, login} = userStore;

</script>

<template>
  <div v-if="user" class="d-flex gap-2 justify-content-center align-items-center">
    <span>{{ user.name }} {{ user.surname }}</span>
    <button
        class="btn btn-primary"
        @click="logout">Logout
    </button>
  </div>

  <div v-else>
    <button
        class="btn btn-primary"
        @click="login">Login
    </button>
  </div>
</template>
