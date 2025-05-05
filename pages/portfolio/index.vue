<script setup lang="ts">
const walletStore = useWalletStore();
const router = useRouter();

if (walletStore.address) {
  await router.push(`/portfolio/${walletStore.address}`);
}

const handleWalletConnect = async () => {
  if (walletStore.address) {
    await router.push(`/portfolio/${walletStore.address}`);
  } else {
    walletStore.setAddress('EiDvt5HzSVEwCbYhkNAERejnyD4YEz9NjtcAnHCWzSxs');
  }
};
</script>

<template>
  <div class="content flex h-full items-center flex-col justify-center">
    <div class="bg" />
    <div class="grid flex flex-col max-w-[500px] gap-6 opacity-100">
      <div class="flex flex-col">
        <h2 class="text-center font-bold text-[64px]">SolarBank</h2>
        <h4 class="text-center font-normal text-2xl text-[#A3A3A3]">Track all your SonicSVM assets, in one place.</h4>
      </div>
      <SearchModal>
        <NButton
          icon="ph:magnifying-glass-fill"
          class="p-4 border bg-[#202020] text-[#A3A3A3] border-[#4E4E4E]"
          color="neutral"
          >Search address or domain</NButton
        >
        <!-- <template #body> TODO </template> -->
      </SearchModal>
      <NButton
        class="items-stretch p-4 text-[#0E0E0E] flex justify-center font-bold text-base leading-normal text-center"
        @click="handleWalletConnect"
        >{{ walletStore.address ? 'View my Portfolio' : 'Connect wallet' }}</NButton
      >
    </div>
  </div>
</template>

<style lang="css" scoped>
.content {
  position: relative;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0) 49.04%, rgba(0, 0, 0, 0.5) 100%),
      url('/assets/bg.png') lightgray 50% / cover no-repeat;
  }

  .grid {
    z-index: 1;
  }
}
</style>
