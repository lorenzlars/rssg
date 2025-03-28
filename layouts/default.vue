<script lang="ts" setup>
import { NuxtLink } from '#components'

const isFetching = useIsFetching()
const loadingBar = useLoadingBar()
const { logout } = useAuth()

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
        {
          default: () => 'Home'
        }
      ),
    key: 'home'
  }
]
</script>

<template>
  <n-layout>
    <n-layout-header bordered>
      <div class="flex justify-between items-center">
        <nav class="flex items-center">
          <span>rssg</span>

          <n-menu
            mode="horizontal"
            :options="menuOptions"
            responsive
          />
        </nav>

        <n-button type="primary" @click="logout">
          Logout
        </n-button>
      </div>
    </n-layout-header>

    <n-layout-content content-style="padding: 24px;">
      <slot />
    </n-layout-content>

    <n-layout-footer bordered />
  </n-layout>
</template>
