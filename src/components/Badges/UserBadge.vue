<script setup lang="ts">
import {computed, type PropType} from "vue";
import type {User} from "../../model/User.ts";
import UserRoleBadge from "./UserRoleBadge.vue";
import {UserRole} from "../../model/enums/UserRole.ts";
import {assertNever} from "../../helpers/SwitchHelper.ts";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

const badgeColor = computed(() => {
  switch (props.user?.role) {
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
    <span>{{ user.name }} {{ user.surname }}</span>
  </div>
</template>

<style scoped>

</style>