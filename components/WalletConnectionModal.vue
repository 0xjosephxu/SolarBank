<script lang="ts" setup>
import { isClient } from '@vueuse/core';

const walletStore = useWalletStore();

const defaultWindow = isClient
  ? (window as unknown as Window & {
      okxwallet: undefined | { solana: { connect: () => Promise<{ publicKey: { toString: () => string } }> } };
    })
  : undefined;

const handleOkxConnect = async () => {
  if (walletStore.address) {
    walletStore.setAddress('');
    return;
  }
  if (defaultWindow?.okxwallet?.solana) {
    const { publicKey } = await defaultWindow.okxwallet.solana.connect();
    walletStore.setAddress(publicKey.toString());
  } else {
    console.error('OKX Wallet not found');
  }
};
</script>
<template>
  <NModal>
    <slot />
    <template #content>
      <div class="flex flex-col gap-3 p-6 bg-[#202020]">
        <p v-if="walletStore.address" class="text-center text-white font-bold">{{ walletStore.address }}</p>
        <NButton color="primary" @click="handleOkxConnect">
          {{ walletStore.address ? `Click to disconnect` : 'Connect to OKX Wallet' }}
        </NButton>
      </div>
    </template>
  </NModal>
</template>
