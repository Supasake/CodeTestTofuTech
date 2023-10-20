<template>
  <q-page class="flex flex-center">
    <TableComp />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TableComp from 'components/Table.vue'

export default defineComponent({
  name: 'TablePage',
  components: {
    TableComp
  },
  setup() {
    return {}
  }
})
</script>
