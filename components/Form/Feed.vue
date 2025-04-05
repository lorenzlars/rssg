<script lang="ts" setup>
import { rssFeedSchema } from '~/server/trpc/schemas'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const props = defineProps<{
  feedId: string
}>()

const emit = defineEmits<{
  success: void
  cancel: void
}>()

const notification = useNotification()
const testData = shallowRef()
const feedData = shallowRef(await $trpc.feeds.get.query({ id: props.feedId }))

const { mutate: addFeed } = useMutation({
  mutationFn: formData => $trpc.feeds.add.mutate(formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feeds'] })
    emit('success')
  }
})

const { mutate: updateFeed } = useMutation({
  mutationFn: formData => $trpc.feeds.update.mutate({ id: props.feedId, ...formData }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feeds'] })
    emit('success')
  }
})

const [zodPlugin, submitHandler] = createZodPlugin(
  rssFeedSchema,
  formData => (props.feedId ? updateFeed(formData) : addFeed(formData))
)

async function executeTest () {
  const { value } = toValue(useFormKitContextById('feed-form'))

  try {
    testData.value = await $trpc.feeds.test.query(value)
  } catch (error) {
    notification.error({ title: 'Test failed', content: error.message })
  }
}
</script>

<template>
  <FormKit
    id="feed-form"
    v-slot="{ value }"
    v-model="feedData"
    type="form"
    :plugins="[zodPlugin]"
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
        <FormKit type="checkbox" name="manual" label="Manually" help="Parse HTML manually" />
        <FormKit v-if="value.manual" type="code" name="code" help="Enter the code that generates the feed" />
      </div>

      <div class="w-full">
        <code>
          {{ testData }}
        </code>
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
      <FormKit
        type="button"
        label="Test"
        @click="executeTest"
      />
    </div>
  </FormKit>
</template>
