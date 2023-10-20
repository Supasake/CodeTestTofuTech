<template>
  <q-page class="flex flex-center">
    <Todo />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Todo from 'components/Todo.vue'

export default defineComponent({
  name: 'TodoPage',
  components: { Todo }

})
</script>
