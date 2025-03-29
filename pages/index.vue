<script lang="ts" setup>
import { NButton } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { FormFeed, NuxtLink } from '#components'

const { $trpc } = useNuxtApp()
const dialog = useDialog()
const queryClient = useQueryClient()

const columns = [
  {
    title: 'Description',
    key: 'description'
  },
  {
    title: 'Interval',
    key: 'interval'
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
                dialog.create({
                  title: 'Edit Feed',
                  content: () => h(FormFeed, {
                    feedId: row.id,
                    onCancel: () => {
                      dialog.destroyAll()
                    }
                  }),
                  draggable: false
                })
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

function addFeed () {
  dialog.create({
    title: 'Add Feed',
    content: () => h(FormFeed, {
      onSuccess: () => {
        console.log('test')
        dialog.destroyAll()
      },
      onCancel: () => {
        dialog.destroyAll()
      }
    }),
    draggable: false
  })
}

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

      <n-button type="default" @click="addFeed">
        Add
      </n-button>
    </div>

    <n-data-table
      :loading="isPending"
      :columns="columns"
      :data="data"
    />
  </div>
</template>
