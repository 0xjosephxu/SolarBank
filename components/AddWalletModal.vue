<template>
  <NModal
    ><slot />
    <template #content>
      <div class="p-6 flex flex-col gap-4">
        <h5>Add Wallet</h5>
        <NInput v-model="addressInputRef" :disabled="nextStep" />
        <NInput v-if="nextStep" v-model="nameInputRef" />
        <div>
          <NButton>Cancel</NButton>
          <NButton @click="handleAddWallet">Go</NButton>
        </div>
      </div>
    </template>
  </NModal>
</template>
<script setup lang="ts">
const addressInputRef = ref<string>('');
const nextStep = ref<boolean>(false);
const nameInputRef = ref<string>('');
const addressBookStore = useAddressBookStore();
const handleAddWallet = () => {
  if (addressInputRef.value && !nextStep.value) {
    nextStep.value = true;
    return;
  }
  if (nameInputRef.value) {
    addressBookStore.addAddress(addressInputRef.value, nameInputRef.value);
    return;
  }
};
</script>
