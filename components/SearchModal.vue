<template>
  <NModal class="">
    <slot name="default" />
    <template #content>
      <div class="p-6 h-[560px] flex flex-col gap-6">
        <NInput v-model="inputRef" placeholder="Search address or domain" variant="outline" :disabled="pending" />
        <div v-if="status === 'idle'">
          <div v-if="!recentlyAdded.length" class="flex-grow flex items-center justify-center">
            <LogoWhite :style="logoStyle" />
          </div>
          <div v-else>
            <div class="flex flex-col">
              <p>Recent</p>
            </div>
            <div class="flex flex-col">
              <p>Address Book</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <p>Result</p>
            <div v-if="data">
              <NuxtLink v-for="item in data.addresses" :key="item" external :to="`/portfolio/${item}`"
                >Go to {{ item }}</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </NModal>
</template>
<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import LogoWhite from '~/assets/svg/Logo_White.svg';
import type { SearchResult } from '~/common/types';
const logoStyle = { height: '200px', width: '200px' };

const RECENT_ADDED_LIMIT = 3;

const inputRef = ref('');
const addressBookStore = useAddressBookStore();
watchDebounced(
  inputRef,
  () => {
    console.log('emit');
    if (inputRef.value) {
      execute();
    }
  },
  { debounce: 500, maxWait: 30000 },
);

const recentlyAdded = computed(() => addressBookStore.getRecentlyAdded(RECENT_ADDED_LIMIT));

const { data, status, execute } = await useLazyFetch<SearchResult>('/api/search', {
  params: { input: inputRef },
  watch: false,
  immediate: false,
  server: false,
});

const pending = computed(() => status.value === 'pending');
</script>
