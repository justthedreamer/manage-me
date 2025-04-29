<script setup lang="ts">
import {useRouter} from "vue-router";
import {Routes} from "../../routing/Routes.ts";
import {useUserStore} from "../../stores/user/UserStore.ts";
import MaxWidthLimiter from "../utils/MaxWidthLimiter.vue";
import {storeToRefs} from "pinia";

const router = useRouter();
const store = useUserStore()
const {user} = storeToRefs(store)

const links = [
  {
    name: "Home",
    routeName: Routes.HOME_ROUTE_RECORD.name,
  },
  {
    name: "Project",
    routeName: Routes.PROJECT_ROUTE_RECORD.name,
  },
  {
    name: "Attachment",
    routeName: Routes.PROJECT_ATTACHMENT_RECORD.name,
  }
]

function isCurrentRoute(name: string | symbol | undefined): boolean {
  return router.currentRoute.value.name === name;
}

</script>

<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg shadow-sm">
    <max-width-limiter :max-width="'1480px'"
                       class="container-fluid d-flex justify-content-between align-items-center px-4 py-2 w-100">
      <header>
        <router-link :to="Routes.HOME_ROUTE_RECORD.path">
          <h1 class="text-uppercase text-light">
            manage<span class="text-primary fw-bold">!</span>me
          </h1>
        </router-link>
      </header>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse gap-2"
           id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-lg-0 gap-3 d-flex align-items-start">
          <li v-for="link in links"
              class="nav-item">
            <router-link :to="{name: link.routeName}">
              <span :class="{'text-primary' : isCurrentRoute(link.routeName)}">{{ link.name }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="user" :to="{name: Routes.HOME_ROUTE_RECORD.name}">
              <span>{{ user.fullName }}</span>
            </router-link>
            <router-link v-else :to="{name: Routes.HOME_ROUTE_RECORD.name}">
              <button class="btn btn-primary" type="button">Login</button>
            </router-link>
          </li>
        </ul>
      </div>
    </max-width-limiter>
  </nav>
</template>

<style scoped>
h1:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: var(--bs-secondary);
}

a:hover {
  color: var(--bs-secondary-text-emphasis);
}

.nav-item:hover > a {
  color: var(--bs-gray-400) !important;
}
</style>