import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useObjectStore = defineStore("object", {
  state: () => ({
    objSelected: [],
  }),
  getters: {
    getObjSelected: (state) => state.objSelected,
  },
  actions: {},
});
