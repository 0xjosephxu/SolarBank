import { defineStore } from 'pinia';
export const useWalletStore = defineStore('wallet', {
  state: () => ({
    address: '',
  }),
  actions: {
    setAddress(address: string) {
      this.address = address;
    },
  },
});
