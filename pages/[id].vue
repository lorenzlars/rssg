<script lang="ts" setup>
import { feedSchema } from '~/server/trpc/schemas'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const defaultFormData = {
  description: 'default description',
  url: 'https://example.com/',
  code: 'default code',
  interval: 10000
}

const { mutate: addFeed } = useMutation({
  mutationFn: formData => $trpc.feeds.add.mutate(formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feeds'] })
  }
})

const [zodPlugin, submitHandler] = createZodPlugin(
  feedSchema,
  addFeed
)
</script>

<template>
  <FormKit type="form" :plugins="[zodPlugin]" :value="defaultFormData" @submit="submitHandler">
    <FormKit type="text" name="description" />
    <FormKit type="url" name="url" />
    <FormKit type="code" name="code" />
    <FormKit type="number" name="interval" number />
  </FormKit>
</template>
