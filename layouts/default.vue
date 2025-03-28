<script lang="ts" setup>
import { NuxtLink } from '#components'

const isFetching = useIsFetching()
const loadingBar = useLoadingBar()

watchEffect(() => {
  if (isFetching.value) {
    loadingBar.start()
  } else {
    loadingBar.finish()
  }
})

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
    <n-layout-header bordered>
      <nav class="flex justify-between items-center">
        <n-menu
          mode="horizontal"
          :options="menuOptions"
          responsive
        />
      </nav>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <slot />
    </n-layout-content>
    <n-layout-footer bordered />
  </n-layout>
</template>
