<script setup lang="ts">
import {useUserStore} from "../../stores/user/UserStore.ts";
import {storeToRefs} from "pinia";
import {useUserAsideStore} from "../../stores/user/UserAsideStore.ts";
import UserRoleBadge from "../badges/UserRoleBadge.vue";
import {useRouter} from "vue-router";
import {Routes} from "../../routing/Routes.ts";

const router = useRouter();
const userStore = useUserStore();
const store = useUserAsideStore();

const {user} = storeToRefs(userStore)

function signOut() {
  store.close();
  userStore.setUser(null);
  router.push(Routes.LOGIN_ROUTE_RECORD)
}
</script>

<template>
  <div v-if="user"
       id="user-aside"
       class="d-flex flex-column bg-dark text-white shadow-lg p-3"
       :class="{'opened': store.opened}">
    <i class="bi bi-x fs-3 align-self-end pointer mb-2" @click="store.close()"/>
    <header class="border border-secondary rounded p-3 mb-4">
      <section class="fs-3 text-center">
        <i class="bi bi-person me-1"></i>
        <span>{{ user.fullName }}</span>
        <span class="d-inline-block text-secondary m-0 p-0 fs-6">{{ user.id }}</span>
      </section>
      <hr class=""/>
      <section class="d-flex justify-content-end">
        <user-role-badge :role="user.role"/>
      </section>
    </header>
    <main class="h-100">
      <div class="nav-item rounded pointer w-100 p-2">
        <span>Your profile</span>
      </div>
    </main>
    <footer>
      <button class="btn btn-primary w-100" @click="signOut">Sign out</button>
    </footer>
  </div>
</template>

<style scoped>
#user-aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  width: 40%;
  height: 100vh;
  z-index: 999 !important;
  transform: translateX(100%);
  transition: .3s;
}

#user-aside.opened {
  transform: translateX(0);
}

.nav-item {
  background-color: var(--bs-secondary-text-emphasis);
  transition: .2s;
}

.nav-item:hover {
  background-color: var(--bs-secondary);
}
</style>