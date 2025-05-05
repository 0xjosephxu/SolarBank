<script setup lang="ts">
import SelectIcon from '~/assets/svg/select.svg';
import SonicLogoIcon from '~/assets/svg/sonic_logo.svg';

import type { DropdownMenuItem } from '@nuxt/ui';

const balance = ref<string>('--');
const amount = ref(0);
// const periodValue = ref(0);
const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: '12 Months',
    },
  ],
]);
</script>

<template>
  <div class="common-page flex justify-around">
    <div class="flex flex-col min-w-120 m-auto p-6 common-border bg-[var(--background-common)]">
      <div class="flex flex-col gap-5">
        <div class="flex gap-2">
          <div class="flex p-1 bg-[var(--background-icon)] rounded-[50%]">
            <SonicLogoIcon class="logo" filled />
          </div>
          <div class="common-title">SONIC Staking</div>
        </div>
        <div class="common-border flex flex-col rounded-sm p-3 gap-3">
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
          <div class="flex flex-1">
            <NInputNumber
              v-model="amount"
              class="common-trade-card-input flex flex-1"
              variant="none"
              min="0"
              placeholder="0"
            >
              <template #decrement>
                <div />
              </template>
              <template #increment>
                <div />
              </template>
            </NInputNumber>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="common-info">Lockup Period</div>
          <NDropdownMenu
            :items="items"
            :content="{ align: 'end' }"
            :ui="{
              content: 'w-48',
            }"
          >
            <NButton variant="ghost" class="common-text p-0 cursor-pointer">
              12 Months
              <SelectIcon class="select" />
            </NButton>
          </NDropdownMenu>
        </div>
        <div class="flex">
          <NButton
            color="primary"
            class="common-button flex justify-center flex-1 px-5 py-3 text-[black] opacity-40 rounded-sm cursor-pointer"
          >
            Coming soon...
          </NButton>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="common-info">Annual Percentage Rate</div>
            <div class="common-text">--</div>
          </div>
          <div class="flex justify-between">
            <div class="common-info">Stake End Date (EST)</div>
            <div class="common-text">--</div>
          </div>
          <div class="flex justify-between">
            <div class="common-info">Transaction Fee (EST)</div>
            <div class="common-text">--</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
svg.nuxt-icon {
  margin: auto 0;

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
