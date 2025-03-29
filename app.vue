<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2f12a1'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-global-style />
    <n-dialog-provider>
      <n-notification-provider>
        <n-loading-bar-provider>
          <n-loading-bar-provider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </n-loading-bar-provider>
        </n-loading-bar-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
