import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { LocalStorage, SessionStorage } from "quasar";
export const useTodoStore = defineStore("todo", {
  state: () => ({
    task: [],
    // getTask: JSON.parse(LocalStorage.getItem("myTask") || []),
    // task: ref(JSON.parse(localStorage.getItem("myTask") || [])),
    // computedTodos: computed(() => this.task),
  }),
  getters: {
    //   getAllTask: (state) => state.task,
  },
  actions: {
    addTask(task) {
      this.task.push(task);
      this.saveTask();
    },
    removeTask(index) {
      this.task.splice(index, 1);
      saveTask();
    },
    saveTask() {
      localStorage.setItem("myTask", JSON.stringify(this.task));
      // LocalStorage.set("myTask", this.myTask);
    },
  },
});
