<script setup lang="ts">
setPageLayout('login')

const { signIn } = useAuth()
</script>

<template>
  <div>
    <n-button theme="primary" @click="signIn('github')">
      Github
    </n-button>
  </div>
</template>
