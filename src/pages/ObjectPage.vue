<template>
  <q-page class='bg-grey-5'>
    <ObjectTable />
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useObjectStore } from 'stores/object-store'
import ObjectTable from 'components/ObjectTable.vue'

export default defineComponent({
  name: 'ObjectPage',
  components: {
    ObjectTable
  },
  setup() {
    const objStore = useObjectStore()
    const elements = computed(() => objStore.getObjSelected)
    function right() {
      document.getElementById("moveButton").addEventListener("click", function () {
        const element = document.getElementById("abv");
        const currentLeft = element.offsetLeft;
        const newPosition = currentLeft + 1;
        element.style.left = newPosition + "px";
      });
    }
    return {
      right,
      elements
    }
  }
})
</script>
<style lang="sass">
#elementToMove
  /* left: @random-margin * 1px; */
  // position: absolute
  left: 0
  top: 0
  transition: left 0.5s
</style>
