<script lang="ts" setup>
import { feedSchema } from '~/server/trpc/schemas'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const props = defineProps<{
  feedId: string
}>()

const emit = defineEmits<{
  success: void
  cancel: void
}>()

const defaultFormData = {
  description: 'Tagesschau',
  url: 'https://google.com/',
  code: `
    return [{
        title: 'Today',
        description: 'Hello World',
        link: 'http://google.com',
        content: html
    }]
  `,
  interval: 720
}

const { data } = useQuery({
  queryKey: ['feed'],
  queryFn: () => $trpc.feeds.get.query({ id: props.feedId })
})

const { mutate: addFeed } = useMutation({
  mutationFn: formData => props.feedId ? $trpc.feeds.update.mutate(formData) : $trpc.feeds.add.mutate(formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feeds'] })
    emit('success')
  }
})

const [zodPlugin, submitHandler] = createZodPlugin(
  feedSchema,
  addFeed
)

const value = computed(() => data.value ?? defaultFormData)
</script>

<template>
  <FormKit type="form" :plugins="[zodPlugin]" :value @submit="submitHandler">
    <FormKit type="text" name="description" />
    <FormKit type="url" name="url" />
    <FormKit type="code" name="code" />
    <FormKit type="number" name="interval" number />
  </FormKit>
  <n-button type="error" @click="emit('cancel')">
    Cancel
  </n-button>
</template>
