<script lang="ts" setup>
const props = defineProps<{
  context: any
}>()
defineOptions({
  inheritAttrs: false
})

function handleInput (value: string) {
  props.context.node.input(value)
}
</script>

<template>
  <CodeEditor :model-value="context._value" @update:model-value="handleInput" />
</template>
