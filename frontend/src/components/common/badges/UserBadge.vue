<script setup lang="ts">
import {computed} from "vue";
import type {User} from "../../../types/User.ts";
import UserRoleBadge from "./UserRoleBadge.vue";
import {UserRole} from "../../../enums/UserRole.ts";
import {assertNever} from "../../../helpers/Guards.ts";

interface Props {
  user: User
}

const props = defineProps<Props>()

const badgeColor = computed(() => {
  switch (props.user.role) {
    case UserRole.DEVELOPER:
      return "bg-primary"
    case UserRole.DEVOPS:
      return "bg-warning"
    case UserRole.ADMIN:
      return "bg-danger"
    default:
      assertNever(props.user.role)
  }
})

</script>

<template>
  <div class="badge d-flex align-items-center justify-content-start"
       :class="badgeColor">
    <user-role-badge :role="user.role"/>
    <span class="ps-1 pe-1">|</span>
    <span>{{ user.name }} {{ user.name }}</span>
  </div>
</template>