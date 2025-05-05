<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import { VueUiDonut, type VueUiDonutConfig, type VueUiDonutDatasetItem } from 'vue-data-ui';
import type {
  AccountTokenHoldingResult,
  AssetInfo,
  LPHoldingResult,
  ProtocolBaseInfo,
  ProtocolHoldingInfo,
  SummaryResult,
} from '~/common/types';

const route = useRoute();
const usingAddress = computed(() => route.params.address);
const { data: overview } = useFetch<AccountTokenHoldingResult>(() => `/api/account/${usingAddress.value}/overview`);

const { data: summary } = useFetch<SummaryResult>(() => `/api/account/${usingAddress.value}/summary`);
const { data: lp } = useFetch<LPHoldingResult>(() => `/api/account/${usingAddress.value}/lp`);
const netWorth = computed(() => summary.value?.netWorthInUSD ?? 0);
const sonicHoldings = computed(() => summary.value?.holdingSonic ?? 0);
const equalToSOL = computed(() => summary.value?.netWorthInSOL ?? 0);
const USDFormatter = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' });
const dataSet: VueUiDonutDatasetItem[] = (summary.value?.tokens ?? []).map(item => ({
  name: item.name,
  values: [item.totalInUSD],
}));

const assetInfoColumns: TableColumn<AssetInfo>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Asset'),
    cell: ({ row }) =>
      h('div', { class: 'text-white flex gap-2' }, [
        h('img', { src: row.original.iconUrl, class: 'size-6' }),
        h('p', {}, row.getValue('name')),
      ]),
  },
  {
    accessorKey: 'balance',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Balance'),
    cell: ({ row }) => h('div', { class: 'text-white' }, row.getValue('balance')),
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Price'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('price'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return h('div', { class: 'text-white' }, formatted);
    },
  },
  {
    accessorKey: 'totalValueInCurrency',
    header: () => h('div', { class: 'text-right text-[#8B8B8B]' }, 'USD Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('totalValueInCurrency'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return h('div', { class: 'text-right text-white' }, formatted);
    },
  },
];
const SEGAProtocol = ref<ProtocolBaseInfo>({
  type: 'Liquidity Pool',
  protocolName: 'SEGA',
  iconUrl: '/sega-icon.png',
  totalHoldingValueInCurrency: 1154.2,
});

const protocolHoldingInfoColumn: TableColumn<ProtocolHoldingInfo>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Pool'),
    cell: ({ row }) => {
      return h('div', { class: 'text-white flex gap-2' }, [
        ...row.original.tokenInfos.map(item => h('img', { src: item.iconUrl, class: 'size-4' })),
        h('p', {}, row.original.assetName),
      ]);
    },
  },
  {
    accessorKey: 'balance',
    header: () => h('div', { class: ' text-[#8B8B8B]' }, 'Balance'),
    cell: ({ row }) =>
      h('div', { class: 'text-white' }, [
        ...row.original.tokenInfos.map(item => h('p', {}, `${item.amount.toFixed(2)} ${item.symbol}`)),
      ]),
  },
  {
    accessorKey: 'totalValueInCurrency',
    header: () => h('div', { class: 'text-right text-[#8B8B8B]' }, 'USD Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('totalValueInCurrency'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return h('div', { class: 'text-right text-white' }, formatted);
    },
  },
];
const config = ref<VueUiDonutConfig>({
  responsive: true,
  style: {
    chart: {
      useGradient: false,
      tooltip: { show: false },
      layout: { labels: { dataLabels: { show: false, useLabelSlots: true } } },
      legend: { show: false },
    },
  },
  userOptions: {
    show: false,
  },
});
</script>
<template>
  <div class="flex flex-col p-6 gap-8 self-stretch bg-[#202020]">
    <div id="header" class="flex flex-col items-stretch gap-2">
      <div class="flex flex-row items-center gap-3">
        <h3 class="font-bold text-2xl">Portfolio</h3>
        <Icon name="ph:arrow-right" class="size-6 text-deep-orange" />
        <h3 class="font-bold text-2xl">SolarBank Demo</h3>
        <Icon name="ph:arrows-clockwise" />
      </div>
      <p class="text-sm text-[#8B8B8B]">Last refresh 21 minutes ago</p>
    </div>
    <div id="portfolio-overview" variant="outline" class="bg-[#0E0E0E] border border-[#303030] rounded-lg flex">
      <div class="border-r border-[#303030] flex-row min-w-[380px]">
        <div class="gap-1 flex flex-col px-5 py-4 border-b border-[#303030]">
          <h6>Net Worth</h6>
          <div class="flex gap-4 items-center">
            <span class="text-4xl font-bold">
              {{ new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(netWorth) }}
            </span>
            <Icon name="ph:eye" class="size-5" />
          </div>
          <h6 class="">≈ {{ equalToSOL.toFixed(2) }} SOL</h6>
        </div>

        <div class="gap-1 flex flex-col px-5 py-4">
          <h6>SONIC Holding</h6>
          <div class="flex gap-4 items-center">
            <span class="font-bold text-4xl">
              {{ new Intl.NumberFormat('en-US', { style: 'decimal' }).format(sonicHoldings) }} SONIC
            </span>
          </div>
          <!-- NO INFO AVAILABLE SO HIDE IT -->
          <h6 class="">{{}}</h6>
        </div>
      </div>
      <div class="py-4 px-5 justify-center items-center flex self-stretch w-full">
        <div class="flex justify-center items-center">
          <ClientOnly>
            <VueUiDonut :dataset="dataSet" :config="config">
              <template #chart-background>
                <div :style="{ width: '100%', height: '100%', background: 'black' }" />
              </template>
              <template #legend="{ legend }">
                <div v-for="item in legend" :key="item.color">
                  <div :style="{ background: item.color, height: '1rem', width: '1rem' }" />
                  {{ legend.name }}
                </div>
              </template>
            </VueUiDonut>
          </ClientOnly>
        </div>
      </div>
    </div>

    <div v-if="overview">
      <div id="assets-holding" class="flex flex-col gap-3">
        <div class="justify-between items-center self-stretch flex">
          <div class="flex flex-row gap-3 items-center">
            <div class="bg-[#363636] rounded-full size-6 flex justify-center items-center">
              <Icon name="ph:wallet" class="size-3" />
            </div>
            <h4>Holdings</h4>
            <Icon name="ph:arrow-square-out" />
          </div>
          <div class="flex gap-2 items-center">
            <h5>
              {{ USDFormatter.format(overview.worthInUSD) }}
            </h5>
            <Icon name="ph:caret-down" />
          </div>
        </div>
        <div class="bg-[#0E0E0E] border border-[#303030] rounded-lg flex pt-3 gap-3 flex-col">
          <div class="flex">
            <h6 class="px-4 py-[6px] rounded-r-3xl bg-[#202020]">Wallet</h6>
          </div>
          <div class="self-stretch items-start flex">
            <NTable :data="overview.tokens" :columns="assetInfoColumns" class="flex-1 divide-default" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="lp" id="protocol-sega" class="flex flex-col gap-3">
      <div class="justify-between items-center self-stretch flex">
        <div class="flex flex-row gap-3 items-center">
          <NuxtImg class="size-6 rounded-full" :src="SEGAProtocol.iconUrl" />
          <h4>{{ SEGAProtocol.protocolName }}</h4>
          <Icon name="ph:arrow-square-out" />
        </div>
        <div class="flex gap-2 items-center">
          <h5>{{ USDFormatter.format(lp.totalAmountInUSD) }}</h5>
          <Icon name="ph:caret-down" />
        </div>
      </div>
      <div class="bg-[#0E0E0E] border border-[#303030] rounded-lg flex pt-3 gap-3 flex-col">
        <div class="flex">
          <h6 class="px-4 py-[6px] rounded-r-3xl bg-[#202020]">{{ SEGAProtocol.type }}</h6>
        </div>
        <div class="self-stretch items-start flex">
          <NTable :data="lp.LPs" :columns="protocolHoldingInfoColumn" class="flex-1" />
        </div>
      </div>
    </div>
  </div>
</template>
