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
  interval: 1440
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
  <FormKit
    type="form"
    :plugins="[zodPlugin]"
    :value
    :actions="false"
    @submit="submitHandler"
  >
    <div class="flex gap-4">
      <div class="w-full">
        <FormKit
          type="url"
          name="url"
          help="Enter the URL of the page where the feed should be generated from"
        />
        <FormKit type="text" name="description" help="Enter a description for the feed" />
        <FormKit type="number" name="interval" number help="Enter the interval in minutes" />
      </div>

      <div class="w-full">
        <FormKit type="code" name="code" help="Enter the code that generates the feed" />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <FormKit
        type="button"
        label="Cancel"
        @click="emit('cancel')"
      />
      <FormKit
        type="submit"
        :label="feedId ? 'Update' : 'Add'"
      />
    </div>
  </FormKit>
</template>
