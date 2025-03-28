<script lang="ts" setup>
import { NButton } from 'naive-ui'

const { $trpc } = useNuxtApp()
const { push } = useRouter()

const columns = [
  {
    title: 'Description',
    key: 'description'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: RowData) => {
      return h('div', { class: 'flex gap-3' }, [
        h(NButton, {
          onClick: () => {
            push({ path: `/${row.id}` })
          },
          type: 'primary'
        }, 'Edit')
      ])
    }
  }
]

const { isPending, data } = useQuery({
  queryKey: ['feeds'],
  queryFn: () => $trpc.feeds.getAll.query()
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
