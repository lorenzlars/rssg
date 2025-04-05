<script lang="ts" setup>
const props = defineProps<{
  context: { _value: string }
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
