<template>
  <div class="row">
    <div class="col-12 col-md-5 q-pa-xs">
      <q-table flat bordered :rows="rows" :columns="columns" row-key="createTime" :loading="loading" selection="multiple"
        v-model:selected="selected">
        <template v-slot:top>
          <q-btn color="indigo" :disable="loading" label="Add Object" @click="addRow" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-weight-bolder text-deep-purple-14">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actionsUpDown="props">
          <q-td :props="props">
            <q-btn :disable="!chqSelected(props.row)" size="sm" color="green" @click="moveUp(props.row)">Up</q-btn>
            <q-btn :disable="!chqSelected(props.row)" size="sm" class="q-mx-xs" color="red"
              @click="moveDown(props.row)">Down</q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-actionsLeftRight="props">
          <q-td :props="props">
            <q-btn :disable="!chqSelected(props.row)" size="sm" color="blue" @click="moveLeft(props.row)">LEFT</q-btn>
            <q-btn :disable="!chqSelected(props.row)" size="sm" class="q-mx-xs" color="orange"
              @click="moveRight(props.row)">RIGHT</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="col-12 col-md-6 q-ma-xs relative-position bg-white flex flex-center q-gutter-sm"
      style="height: 600px; max-height: 80vh">
      <q-chip v-for="el in elements" :key="el.createTime" color="pink-10" text-color="white" square :id="el.createTime"
        class="absolute">{{
          el.name }}</q-chip>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useObjectStore } from 'stores/object-store'

const columns = [
  // {
  //   name: 'index',
  //   label: '#',
  //   field: 'index',
  //   align: 'left'
  // },
  {
    name: 'name',
    required: true,
    label: 'Object Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actionsUpDown', label: 'Action Up Down', align: 'left', },
  { name: 'actionsLeftRight', label: 'Action Left Right', align: 'left', }
]

const originalRows = [
  {
    name: 'Frozen Yogurt',
    createTime: 1697739006160
  },
  {
    name: 'Ice cream sandwich',
    createTime: 1697739174165
  },
  {
    name: 'Eclair',
    createTime: 1697739201562
  },
]
export default {
  setup() {
    const objStore = useObjectStore()
    const selected = computed({
      get() {
        return objStore.getObjSelected
      },
      set(newValue) {
        objStore.objSelected = newValue
      }
    })
    const elements = computed(() => objStore.getObjSelected)
    const loading = ref(false)
    const rows = ref([...originalRows])

    function chqSelected(row) {
      for (const i of selected.value) {
        if (i.createTime === row.createTime) {
          return true
        }
      }
      return false
    }
    function moveUp(i) {
      const element = document.getElementById(i.createTime);
      const current = element.offsetTop;
      if (current > 7) {
        const newPosition = current - 15;
        element.style.top = newPosition + "px";
      }
    }
    function moveDown(i) {
      const element = document.getElementById(i.createTime);
      const current = element.offsetTop;
      if (current < 470) {
        const newPosition = current + 1;
        element.style.top = newPosition + "px";
      }
    }
    function moveRight(i) {
      const element = document.getElementById(i.createTime);
      const current = element.offsetLeft
      const width = element.offsetWidth
      if (current + width < 675) {
        const newPosition = current + 1;
        element.style.left = newPosition + "px";
      }
    }
    function moveLeft(i) {
      const element = document.getElementById(i.createTime);
      const current = element.offsetLeft
      if (current > 7) {
        const newPosition = current - 15;
        element.style.left = newPosition + "px";
      }
    }
    return {
      selected,
      columns,
      rows,
      loading,
      elements,

      addRow() {
        loading.value = true
        setTimeout(() => {
          const index = Math.floor(Math.random() * (rows.value.length + 1)),
            row = originalRows[Math.floor(Math.random() * originalRows.length)]
          const newRow = { ...row, createTime: new Date().getTime() }
          rows.value = [...rows.value.slice(0, index), newRow, ...rows.value.slice(index)]
          loading.value = false
        }, 500)
      },
      chqSelected,
      moveUp,
      moveDown,
      moveLeft,
      moveRight
    }
  }
}
</script>
<style></style>
