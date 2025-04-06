<script lang="ts" setup>
import { NButton, NCheckbox } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { FormFeed } from '#components'
import FeedDialog from '~/pages/FeedDialog.vue'

const { $trpc } = useNuxtApp()
const dialog = useDialog()
const queryClient = useQueryClient()
const showDialog = shallowRef(false)

const columns = [
  {
    title: 'Title',
    key: 'title'
  },
  {
    title: 'Manual',
    key: 'manual',
    render: (row: RowData) => h(
      NCheckbox,
      {
        checked: row.manual,
        disabled: true
      }
    )
  },
  {
    title: 'Posts',
    key: '_count.posts'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: RowData) => {
      return h('div',
        {
          class: 'flex gap-3'
        },
        {
          default: () => [
            h(NButton, {
              onClick: () => {
                showDialog.value = true
              },
              type: 'default'
            },
            {
              default: () => 'Edit'
            }),
            h(NButton, {
              onClick: () => {
                dialog.error({
                  title: 'Delete Feed',
                  content: 'Are you sure?',
                  positiveText: 'Delete',
                  negativeText: 'Cancel',
                  draggable: false,
                  onPositiveClick: () => {
                    deleteFeed(row.id)
                  }
                })
              },
              type: 'default'
            },
            {
              default: () => 'Delete'
            })
          ]
        })
    }
  },
  {
    key: 'link',
    render: (row: RowData) => {
      return h('a', {
        href: `/api/rss/${row.id}`,
        target: '_blank'
      },
      {
        default: () => 'RSS'
      })
    }
  }
]

const { isPending, data } = useQuery({
  queryKey: ['feeds'],
  queryFn: () => $trpc.feeds.getAll.query()
})

const { mutate: deleteFeed } = useMutation({
  mutationFn: id => $trpc.feeds.delete.mutate({ id }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feeds'] })
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-6">
      <h1>
        Feeds
      </h1>

      <n-button type="default" @click="showDialog = true">
        Add
      </n-button>
    </div>

    <n-data-table
      :loading="isPending"
      :columns="columns"
      :data="data"
    />
    <FeedDialog v-model:show="showDialog" />
  </div>
</template>
