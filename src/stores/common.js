import { defineStore } from 'pinia';

export const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    isLoading: false,
  }),
  getters: {
    currentState: (state) => state.isLoading,
  },
  actions: {
    on() {
      this.isLoading = true;
    },
    off() {
      this.isLoading = false;
    },
  },
});
