import { plugin, defaultConfig, createInput } from '@formkit/vue'
import { FormKitCodeEditor } from '#components'

const codeEditorInput = createInput({
  $cmp: FormKitCodeEditor,
  props: {
    context: '$node.context'
  }
})

const config = defaultConfig({
  inputs: {
    code: codeEditorInput
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, config)
})
