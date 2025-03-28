<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { NuxtLink } from '#components'

const { $trpc } = useNuxtApp()
const { push } = useRouter()
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
                push({ path: `/${row.id}` })
              },
              type: 'primary'
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
              type: 'error'
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
      return h(NuxtLink, {
        to: {
          path: `/api/rss/${row.id}`
        }
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
    <div class="flex justify-between items-center">
      <h1>
        Feeds
      </h1>
      <NuxtLink to="/add">
        Add
      </NuxtLink>
    </div>
    <n-data-table
      :loading="isPending"
      :columns="columns"
      :data="data"
      :bordered="false"
    />
  </div>
</template>
