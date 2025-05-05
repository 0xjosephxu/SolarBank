<script setup lang="ts">
import SelectIcon from '~/assets/svg/select.svg';
import ConnectorIcon from '~/assets/svg/connector.svg';

import type { DropdownMenuItem } from '@nuxt/ui';

const img = useImage();
const balance = ref<string>('--');
const amount = ref(0);
// const periodValue = ref(0);
const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'SOL',
      avatar: {
        src: img('~/assets/svg/sol_logo.png'),
      },
    },
  ],
]);
const address = ref('');
</script>

<template>
  <div class="common-page flex justify-around">
    <div class="flex flex-col min-w-120 m-auto p-6 common-border bg-[var(--background-common)]">
      <div class="flex flex-col gap-8">
        <div class="flex gap-1">
          <div class="flex flex-col flex-1 gap-2">
            <div class="common-info">From</div>
            <div class="common-border flex w-full p-3 bg-[var(--background-input)] gap-2 cursor-pointer">
              <img src="~/assets/svg/sol_logo.png" alt="" >
              <div class="common-text flex flex-col justify-around">Solana</div>
            </div>
          </div>
          <div class="p-3 mt-auto">
            <ConnectorIcon class="connector" filled />
          </div>
          <div class="flex flex-col flex-1 gap-2">
            <div class="common-info">To</div>
            <div class="common-border flex w-full p-3 bg-[var(--background-input)] gap-2 cursor-pointer">
              <img src="~/assets/svg/sonic_logo.png" alt="" >
              <div class="common-text flex flex-col justify-around">SonicSVM</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="common-info">Amount</div>
          <div class="flex flex-1 w-full">
            <NInput v-model="amount" class="common-input flex flex-1 w-full" variant="none" placeholder="0">
              <template #trailing>
                <NDropdownMenu
                  :items="items"
                  :content="{ align: 'end' }"
                  :ui="{
                    content: 'w-48',
                  }"
                >
                  <NButton variant="ghost" class="common-text p-0 cursor-pointer">
                    <img src="~/assets/svg/sol_logo.png" alt="" >
                    SOL
                    <SelectIcon class="select" />
                  </NButton>
                </NDropdownMenu>
              </template>
            </NInput>
          </div>
          <div class="flex justify-between">
            <div class="common-info flex items-center">
              Balance:&nbsp;
              <div class="common-text">{{ balance }}</div>
            </div>
            <div class="flex gap-2">
              <div class="common-text flex px-2 py-1 bg-[var(--background-light-grey)] cursor-pointer rounded-sm">
                25%
              </div>
              <div class="common-text flex px-2 py-1 bg-[var(--background-light-grey)] cursor-pointer rounded-sm">
                50%
              </div>
              <div class="common-text flex px-2 py-1 bg-[var(--background-light-grey)] cursor-pointer rounded-sm">
                MAX
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="common-info">Destination Address</div>
            <div class="common-action cursor-pointer opacity-60">My Wallet Address</div>
          </div>
          <div class="flex flex-1 w-full">
            <NInput v-model="address" class="common-input flex flex-1 w-full" variant="none" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="common-info">Transaction Fee (EST)</div>
            <div class="common-text">--</div>
          </div>
        </div>
        <div class="flex">
          <NButton
            color="primary"
            class="common-button flex justify-center flex-1 px-5 py-3 text-[black] opacity-40 rounded-sm cursor-pointer"
          >
            Coming soon...
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
svg.nuxt-icon {
  margin: auto 0;

  &.connector {
    width: 1rem;
    height: 1rem;
    margin: 0.25rem 0;
  }

  &.logo {
    width: 1.5rem;
    height: 1.5rem;
  }

  &.select {
    width: 1rem;
    height: 1rem;
    fill: #4e4e4e;
  }
}
</style>
