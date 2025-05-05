<template>
  <ClientOnly>
    <div class="flex gap-6 bg-[#202020] h-full items-center flex-col p-6 self-stretch">
      <div class="flex items-center justify-between self-stretch">
        <h4 class="text-2xl font-bold">Address Book</h4>
        <AddWalletModal>
          <NButton class="text-black font-bold items-start justify-center px-4 py-2"> Add Wallet </NButton>
        </AddWalletModal>
      </div>
      <div class="border border-[#303030] rounded-lg flex w-full">
        <NTable
          class="bg-[#0E0E0E] flex-1 rounded-lg"
          :data="addressBookStore.getData()"
          :columns="addressBookColumns"
        />
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { EditWalletModal, NButton } from '#components';
import type { TableColumn } from '@nuxt/ui';

const addressBookStore = useAddressBookStore();

const addressBookColumns: TableColumn<AddressBookData>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Name'),
  },
  { accessorKey: 'address', header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Address') },
  {
    accessorKey: 'actions',
    header: () => h('div', { class: ' text-[#8B8B8B] text-right' }, 'Action'),
    cell: ({ row }) => {
      return h('div', { class: 'flex-row-reverse flex gap-2 right-0' }, [
        h(
          EditWalletModal,
          { address: row.original.address },
          h(NButton, {
            icon: 'ph:pencil-simple-line',
            class: 'p-2',
          }),
        ),
        h(NButton, {
          icon: 'ph:trash',
          class: 'p-2',
          onClick: () => {
            addressBookStore.removeAddress(row.original.address);
          },
        }),
      ]);
    },
  },
];
</script>
