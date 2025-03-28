<script lang="ts" setup>

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
  </n-config-provider>
</template>
