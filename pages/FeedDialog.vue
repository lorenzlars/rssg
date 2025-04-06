<script lang="ts" setup>
const show = defineModel<boolean>('show')
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="card"
    title="Feed"
    class="max-w-[90vw] max-h-[90vh]"
    closable
  >
    <template #default>
      <FormFeed />
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>

</style>
