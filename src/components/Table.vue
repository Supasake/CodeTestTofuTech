<template>
  <div v-if="dataComments" class="q-pa-xs">
    <q-table :grid="$q.screen.lt.md" :card-class="$q.screen.lt.md ? 'bg-primary text-white' : ''" :rows="dataComments"
      :columns="columns" row-key="id" :pagination="initialPagination" :filter="filter" v-model:expanded="expanded"
      wrap-cells>
      <template v-slot:top-left>
        <q-input class="q-pa-xs" :class="$q.screen.lt.md ? 'bg-indigo-1' : 'bg-orange-1'" borderless dense debounce="300"
          v-model="filter" placeholder="พิมพ์ข้อมูลที่ต้องการค้นหา">
          <template v-slot:prepend>
            <q-icon :color="$q.screen.lt.md ? 'primary' : 'deep-orange-14'" name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-weight-bolder text-deep-orange-14">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :class="props.rowIndex % 2 === 0 ? 'bg-deep-orange-1' : 'bg-blue-grey-1'">
          <q-td auto-width>
            <q-toggle v-model="props.expand" color="orange-10" checked-icon="add" unchecked-icon="remove" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props"
          :class="props.rowIndex % 2 === 0 ? 'bg-deep-orange-1' : 'bg-blue-grey-1'">
          <q-td colspan="100%">
            <div class="text-left"><span class="text-bold">Full Name : </span> {{ props.row.name }}.</div>
            <div class="text-left"><span class="text-bold">All Body : </span> {{ props.row.body }}.</div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> ไม่่พบข้อมูล ... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
const columns = [
  {
    name: 'id', label: 'ID', field: 'id', align: 'right', style: "max-width: 100px",
    classes: "ellipsis",
    headerStyle: "max-width: 100px",
  },
  {
    name: 'name',
    required: true,
    label: 'NAME',
    align: 'left',
    field: row => row.name,
    style: "max-width: 200px",
    classes: "ellipsis",
    headerStyle: "max-width: 200px",
  },
  {
    name: 'email', align: 'center', label: 'E-MAIL', field: 'email', sortable: true, style: "max-width: 190px",
    classes: "ellipsis",
    headerStyle: "max-width: 190px",
  },
  {
    name: 'postId', label: 'POST ID', field: 'postId', style: "max-width: 100px",
    classes: "ellipsis", align: 'center',
    headerStyle: "max-width: 100px", sortable: true
  },

  {
    name: 'body', label: 'BODY', field: 'body', align: 'left', style: "max-width: 350px",
    classes: "ellipsis",
    headerStyle: "max-width: 350px",
  }
]
export default defineComponent({
  name: 'TableComponent',
  setup() {
    const $q = useQuasar()
    const dataComments = ref(null)
    function loadData() {
      api.get('/comments')
        .then((response) => {
          dataComments.value = response.data
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
    onMounted(() => {
      loadData()
    });
    return {
      columns,
      dataComments,
      expanded: ref([
        ''
      ]),
      filter: ref(""),
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    }
  }
})
</script>
