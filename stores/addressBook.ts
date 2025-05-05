// import * as A from 'fp-ts/lib/Array';
import { Array as A, Order, pipe } from 'effect';

import { defineStore } from 'pinia';
type Address = string;
type AddressInfo = { name: string; addedOn: number };
const DEFAULT_LIMIT = 10;
export type AddressBookData = {
  address: Address;
  name: string;
  addedOn: number;
};

export const useAddressBookStore = defineStore(
  'addressBook',
  {
    state: () => {
      return { addresses: new Map<Address, AddressInfo>() };
    },
    persist: true,
    getters: {
      getRecentlyAdded(state) {
        return (limit: number) =>
          pipe(
            state.addresses.values(),
            A.fromIterable,
            A.sortBy(Order.mapInput(Order.number, user => user.addedOn)),
            A.take(limit),
          );
      },
      getData(state) {
        return (limit?: number) =>
          pipe(
            state.addresses.entries(),
            A.fromIterable,
            A.sortBy(Order.mapInput(Order.number, ([_, user]) => user.addedOn)),
            A.map(
              item => ({ name: item[1].name, address: item[0], addedOn: item[1].addedOn }) satisfies AddressBookData,
            ),
            A.take(limit ?? DEFAULT_LIMIT),
          );
      },
    },
    actions: {
      addAddress(address: Address, name: string) {
        this.addresses.set(address, { name, addedOn: Date.now() });
      },
      editAddress(address: Address, name: string) {
        const addressInfo = this.addresses.get(address);
        if (addressInfo) {
          this.addresses.set(address, { ...addressInfo, name });
        } else {
          this.addresses.set(address, { name, addedOn: Date.now() });
        }
      },
      removeAddress(address: Address) {
        this.addresses.delete(address);
      },
    },
  },
  //   { persist: true },
);
