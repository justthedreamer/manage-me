<script setup lang="ts">
import {type RouteRecordRaw, useRouter} from "vue-router";
import {Routes} from "../../routing/Routes.ts";
import {useUserStore} from "../../stores/user/UserStore.ts";
import MaxWidthLimiter from "../utils/MaxWidthLimiter.vue";
import {storeToRefs} from "pinia";
import {useUserAsideStore} from "../../stores/user/UserAsideStore.ts";
import LoginButton from "../common/LoginButton.vue";
import Logo from "../common/Logo.vue";

const router = useRouter();
const store = useUserStore()
const userAsideStore = useUserAsideStore();
const {user} = storeToRefs(store)

const links = [Routes.PROJECT_ROUTE_RECORD, Routes.PROJECT_ATTACHMENT_RECORD]

function isCurrentRoute(name: string | symbol | undefined): boolean {
  return router.currentRoute.value.name === name;
}

async function go(route: RouteRecordRaw) {
  await router.push(route);
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
    <max-width-limiter :max-width="'1480px'"
                       class="container-fluid d-flex justify-content-between align-items-center px-4 py-2 w-100">
      <header>
        <logo class="nav-item" :theme="'text-light'" @click="go(Routes.HOME_ROUTE_RECORD)"/>
      </header>

      <button id="top-navbar-hamburger-button"
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <section id="navbarSupportedContent"
               class="collapse navbar-collapse gap-2">
        <ul class="navbar-nav ms-auto mb-lg-0 gap-3 d-flex align-items-center">
          <li v-if="user" v-for="link in links"
              class="nav-item">
            <span :class="{'text-primary' : isCurrentRoute(link.name)}"
                  @click="go(link)">{{ link.name }}</span>
          </li>

          <li class="nav-item">
            <span v-if="user" @click="userAsideStore.open()">{{ user.fullName }}</span>
            <login-button v-else/>
          </li>
        </ul>
      </section>
    </max-width-limiter>
  </nav>
</template>

<style scoped>
h1:hover {
  cursor: pointer;
}

.nav-item,
.nav-item > a {
  text-decoration: none !important;
  color: var(--bs-secondary) !important;

}

.nav-item:hover,
.nav-item > a:hover {
  color: var(--bs-white) !important;
  cursor: pointer;
}
</style>