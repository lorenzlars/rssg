<template>
  <naive-config>
    <n-notification-provider :max="1" placement="bottom-left">
      <naive-notification />
      <n-dialog-provider>
        <n-loading-bar-provider>
          <n-loading-bar-provider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </n-loading-bar-provider>
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </naive-config>
</template>
