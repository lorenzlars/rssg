<script lang="ts" setup>
import { rssFeedSchema } from '~/server/trpc/schemas'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const props = defineProps<{
  feedId?: string
}>()

const emit = defineEmits<{
  success: void
  cancel: void
}>()

const form = useFormKitContextById('feed-form')
const feedData = shallowRef(props.feedId
  ? await $trpc.feeds.get.query({ id: props.feedId })
  : {
      title: 'Test',
      url: 'https://www.tagesschau.de/archiv',
      manual: true,
      code: `
        return Array
          .from(document.querySelectorAll('.container .l-eight .copytext-element-wrapper__vertical-only'))
          .map((post) => ({
            title: 'Test',
            description: 'https://example.com',
            link: 'This is a test feed',
            content: \`\${post.textContent}\`
          }))
      `
    })

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

const { error: testError, data: testData, refetch: executeTest, isRefetching } = useQuery({
  queryKey: ['test', props.feedId],
  queryFn: () => $trpc.feeds.test.query(form.value!.value),
  enabled: false
})
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
        <FormKit type="text" name="title" help="Enter a title for the feed" />
        <FormKit type="text" name="description" help="Enter a description for the feed" />
        <FormKit
          type="url"
          name="url"
          help="Enter the URL of the page where the feed should be generated from"
        />
        <FormKit type="checkbox" name="manual" label="Manually" help="Parse HTML manually" />
        <FormKit v-if="value.manual" type="code" name="code" help="Enter the code that generates the feed" />
      </div>

      <div class="w-full flex flex-col gap-4">
        <n-alert v-if="testError" title="Error" type="error">
          {{ testError?.message }}
        </n-alert>
        <n-alert v-if="testData?.length > 0" title="Details" type="info">
          <span>Count: {{ testData?.length }}</span>
        </n-alert>
        <div class="h-[20rem] flex flex-col gap-4 overflow-y-auto">
          <n-card v-for="post of testData" :key="post.title" :title="post.title" size="small">
            {{ post.content }}
          </n-card>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <n-button
        :loading="isRefetching"
        @click="() => executeTest()"
      >
        Test
      </n-button>
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
