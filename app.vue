<template>
  <naive-config>
    <n-notification-provider :max="1" placement="bottom-left">
      <naive-notification />
      <n-dialog-provider>
        <n-modal-provider>
          <n-loading-bar-provider>
            <n-loading-bar-provider>
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </n-loading-bar-provider>
          </n-loading-bar-provider>
        </n-modal-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </naive-config>
</template>
