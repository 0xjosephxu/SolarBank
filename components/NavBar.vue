<script lang="ts" setup>
import AvatarIcon from '~/assets/svg/avatar.svg';

const walletStore = useWalletStore();
const connected = computed(() => walletStore.address !== '');
const addressText = computed(
  () => `${walletStore.address.substring(0, 4)}...${walletStore.address.substring(walletStore.address.length - 4)}`,
);
const color = computed(() => (connected.value ? 'neutral' : 'primary'));
const buttonText = computed(() => (walletStore.address.length > 0 ? addressText : 'Connect Wallet'));
console.log('connected', connected.value);
// const handleWalletConnect = async () => {
//   if (walletStore.address) {
//     walletStore.setAddress('');
//   } else {
//     walletStore.setAddress('EiDvt5HzSVEwCbYhkNAERejnyD4YEz9NjtcAnHCWzSxs');
//   }
// };
</script>

<template>
  <div class="content flex w-full p-5 gap-3 items-center justify-between">
    <SearchModal>
      <NButton icon="ph:magnifying-glass-fill" class="search p-3 gap-2" color="neutral">
        Search address or domain
      </NButton>
    </SearchModal>
    <div class="flex gap-3">
      <NButton class="common-text button py-3 px-5" to="/settings/address-book" color="neutral">Address Book</NButton>
      <WalletConnectionModal>
        <NButton
          class="common-text py-3 px-5 gap-2"
          :class="{ button: connected }"
          :data-connected="connected"
          :color="color"
        >
          <AvatarIcon v-if="connected" class="avatar" filled />
          {{ buttonText }}
        </NButton>
      </WalletConnectionModal>
    </div>
  </div>
</template>

<style lang="css" scoped>
.content {
  border-bottom: 1px solid var(--border-common-color);
  background: var(--background-common);
}

.search {
  width: 22.5rem;
  color: #a3a3a3;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-style: var(--font-common-style);
  font-weight: 400;
  line-height: var(--font-common-line-height);
  border-radius: var(--border-common-radius);
  border: 1px solid #4e4e4e;
  background: var(--background-input);
  box-sizing: border-box;
}

.button {
  line-height: 1.25rem;
  background: var(--background-lighter-grey);
  border-radius: var(--border-common-radius);
}
</style>
