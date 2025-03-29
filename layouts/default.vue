<script lang="ts" setup>
import { Menu } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NuxtLink } from '#components'

const isFetching = useIsFetching()
const loadingBar = useLoadingBar()
const { signOut } = useAuth()

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
          default: () => 'Feeds'
        }
      ),
    key: 'home'
  }
]

const userOptions = [
  {
    label: 'Profile',
    key: 'profil',
    disabled: true
  },
  {
    label: 'Sign Out',
    key: 'signOut'
  }
]

function handleSelect (key: string | number) {
  switch (key) {
    case 'signOut':
      return signOut()
  }
}
</script>

<template>
  <n-layout>
    <n-layout-header bordered>
      <div class="container mx-auto">
        <div class="flex justify-between items-center py-2">
          <nav class="flex items-center">
            <NuxtLink :to="{ name: 'index' }" class="font-bold">
              rssg
            </NuxtLink>

            <n-menu
              mode="horizontal"
              :options="menuOptions"
              responsive
            />
          </nav>

          <n-dropdown trigger="hover" :options="userOptions" @select="handleSelect">
            <n-button type="default">
              <n-icon :size="24">
                <Menu />
              </n-icon>
            </n-button>
          </n-dropdown>
        </div>
      </div>
    </n-layout-header>

    <n-layout-content content-style="padding: 24px;">
      <main class="container mx-auto">
        <slot />
      </main>
    </n-layout-content>

    <n-layout-footer bordered>
      <footer class="container mx-auto" />
    </n-layout-footer>
  </n-layout>
</template>
