<template>
  <div>
    <q-input class="q-pa-md" autogrow maxlength="27" :class="$q.screen.lt.md ? '' : 'absolute-top-left '" color="lime-11"
      bg-color="green-2" filled v-model="newTask" @keyup.enter="addTask" label="ระบุรายการต้องทำ">
      <template v-slot:prepend>
        <q-icon color="lime-10" name="event" />
      </template>
      <template v-slot:append>
        <q-btn round push dense icon="add" color="lime-10" @click="addTask" />
      </template>
    </q-input>
    <Draggable v-model="tasks" group="tasks" item-key="id">
      <template #item="{ element }">
        <q-card flat bordered class="my-card q-ma-sm"
          :class="element.completed ? 'bg-purple-1' : 'bg-secondary text-white'">
          <q-card-section>
            <div class="row no-wrap">
              <div class="col">
                <div :class="element.completed ? 'text-strike' : 'text-bold text-subtitle1 text-no-wrap'"> {{
                  element.title
                }}</div>
                <div :class="element.completed ? 'text-strike' : 'text-overline'">{{
                  dateFormat.formatDate(element.created,
                    'DD-MMM-YYYY : HH:mm') }}
                </div>
              </div>

              <div class="col-auto">
                <q-btn :color="element.completed ? 'grey-7' : 'yellow'" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item @click="removeTask(element.created)" clickable class="text-red-10 bg-yellow-2">
                        <q-item-section>Remove</q-item-section>
                      </q-item>
                      <q-item @click="updateStatus(element.created)" clickable class="text-bold text-lime-10 bg-lime-3">
                        <q-item-section>Completed</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>

      </template>
    </Draggable>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar, date } from 'quasar'
// import { useTodoStore } from 'stores/todo-store';
import Draggable from 'vuedraggable'
export default defineComponent({
  name: 'TodoComponent',
  components: {
    Draggable
  },
  setup() {
    const $q = useQuasar()
    const dateFormat = date
    // const todoStore = useTodoStore()
    const newTask = ref('')
    const tasks = ref([])
    function addTask() {
      if (newTask.value.trim() !== '') {
        const taskObject = { title: newTask.value, completed: false, created: new Date().getTime() };
        tasks.value.push(taskObject);
        saveTask();
        newTask.value = '';
      }
    }
    function removeTask(time) {
      const removeIndex = tasks.value.findIndex((task) => task.created === time);
      if (removeIndex !== -1) {
        tasks.value.splice(removeIndex, 1);
        saveTask();
      }
    }
    function updateStatus(time) {
      const index = tasks.value.findIndex((task) => task.created === time);
      tasks.value[index].completed = !tasks.value[index].completed;
      saveTask();
    }
    function saveTask() {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    }
    function loadTasks() {
      const data = localStorage.getItem('tasks');
      if (data) {
        tasks.value = JSON.parse(data);
      }
    }
    onMounted(() => {
      loadTasks()
    });
    return {
      dateFormat,
      newTask,
      tasks,
      loadTasks,
      addTask,
      removeTask,
      updateStatus,
      saveTask
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  max-width: 350px
</style>
