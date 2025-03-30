<script setup lang="ts">
import { LogoGithub } from '@vicons/ionicons5'
setPageLayout('login')

const { signIn } = useAuth()
</script>

<template>
  <n-card class="w-full max-w-sm">
    <template #header>
      <h1 class="text-center !text-2xl">
        Login
      </h1>
    </template>

    <template #default>
      <div class="flex justify-center">
        <n-button type="primary" class="grow-1" @click="signIn('github')">
          <template #icon>
            <LogoGithub />
          </template>

          <template #default>
            GitHub
          </template>
        </n-button>
      </div>
    </template>
  </n-card>
</template>
