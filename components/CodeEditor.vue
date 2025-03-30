<script lang="ts" setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

const modelValue = defineModel<string>()
const containerElement = useTemplateRef('container')

onMounted(() => {
  const editor = monaco.editor.create(containerElement.value, {
    value: modelValue.value,
    language: 'javascript',
    theme: 'vs-light',
    windoWidth: 1280
  })

  editor.onDidChangeModelContent(() => {
    modelValue.value = editor.getValue()
  })
})
</script>

<template>
  <div ref="container" class="min-h-64 w-full" />
</template>
