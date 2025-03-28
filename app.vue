<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/next'
</script>

<template>
  <n-config-provider>
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
    <Analytics />
  </n-config-provider>
</template>
