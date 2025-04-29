<script setup lang="ts">
import {UserRole} from "../../model/enums/UserRole.ts";

interface Props {
  role: UserRole
}

defineProps<Props>()

</script>

<template>
  <span v-if="role === UserRole.DEVELOPER">
    <span class="bi bi-keyboard"></span>
    <span class="text-uppercase ms-1">dev</span>
  </span>
  <span v-if="role === UserRole.DEVOPS">
    <span class="bi bi-gear"></span>
    <span class="text-uppercase ms-1">devops</span>
  </span>
  <span v-if="role === UserRole.ADMIN">
    <span class="bi bi-person-up"></span>
    <span class="text-uppercase ms-1">admin</span>
  </span>
</template>