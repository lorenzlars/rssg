<script lang="ts" setup>
import { NuxtLink } from '#components'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: {
            name: 'index'
          }
        },
        { default: () => 'Home' }
      ),
    key: 'home'
  }
]
</script>

<template>
  <n-layout>
    <n-layout-header>
      <n-menu
        mode="horizontal"
        :options="menuOptions"
        responsive
      />
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <slot />
    </n-layout-content>
    <n-layout-footer />
  </n-layout>
</template>
