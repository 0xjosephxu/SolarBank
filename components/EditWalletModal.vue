<template>
  <NModal v-model:open="open"
    ><slot />
    <template #content>
      <div class="p-6 flex flex-col gap-4">
        <h5>Edit Wallet</h5>
        <NInput :model-value="addressInputRef" :disabled="true" />
        <NInput v-model="nameInputRef" />
        <div>
          <NButton @click="handleClose">Cancel</NButton>
          <NButton @click="handleEditWallet">Go</NButton>
        </div>
      </div>
    </template>
  </NModal>
</template>
<script setup lang="ts">
const { address } = defineProps<{ address: string }>();
const open = ref(false);
const handleClose = () => {
  open.value = false;
};
const addressBookStore = useAddressBookStore();
const addressInputRef = ref<string>(address);
const nameInputRef = ref<string>('');
const handleEditWallet = () => {
  if (nameInputRef.value) {
    addressBookStore.editAddress(addressInputRef.value, nameInputRef.value);
    return;
  }
};
</script>
