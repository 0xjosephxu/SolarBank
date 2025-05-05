<script setup lang="ts">
import BridgeIcon from '~/assets/svg/bridge-icon.svg';
import PortfolioIcon from '~/assets/svg/portfolio-icon.svg';
import StakeIcon from '~/assets/svg/stake-icon.svg';
</script>

<template>
  <div class="content flex flex-col w-[18rem] top-0 sticky h-svh">
    <NuxtLink to="/">
      <NuxtImg src="/Logo.svg" class="m-5 mr-auto w-[auto] h-[2.75rem]" />
    </NuxtLink>
    <div class="flex-grow">
      <div class="flex flex-col gap-5 h-full justify-center">
        <NuxtLink
          :to="{ path: '/portfolio' }"
          class="link flex items-center gap-2 pl-4"
          :class="{ active: $route.path.includes('/portfolio') }"
          active-class="active"
          exact-active-class="active"
        >
          <div id="icon-outer" class="size-10 justify-center items-center flex">
            <PortfolioIcon id="icon" />
          </div>
          <div class="flex flex-col items-start">
            <h4 id="header">Portfolio</h4>
            <span id="subtitle">Track all your SonicSVM assets</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/stake" class="link flex items-center gap-2 pl-4" active-class="active">
          <div id="icon-outer" class="size-10 justify-center items-center flex">
            <StakeIcon id="icon" />
          </div>
          <div class="flex flex-col items-start">
            <h4 id="header">Stake</h4>
            <span id="subtitle">Stake your SONIC</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/bridge" class="link flex items-center gap-2 pl-4" active-class="active">
          <div id="icon-outer" class="size-10 justify-center items-center flex">
            <BridgeIcon id="icon" />
          </div>
          <div class="flex flex-col items-start">
            <h4 id="header">Bridge</h4>
            <span id="subtitle">Bridges assets into SonicSVM</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.content {
  border-right: 1px solid var(--border-common-color);

  svg.nuxt-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }

  .link {
    border-left: 3px solid transparent;

    #icon-outer {
      border-radius: var(--border-common-radius);
      background: var(--background-input);
    }

    #header {
      color: #a3a3a3;
      font-family: var(--font-sans);
      font-size: 1.25rem;
      font-style: var(--font-common-style);
      font-weight: 700;
      line-height: var(--font-common-line-height);
    }

    #subtitle {
      color: #8b8b8b;
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-style: var(--font-common-style);
      font-weight: 400;
      line-height: var(--font-common-line-height);
    }

    &.active {
      border-color: var(--color-deep-orange);

      #icon-outer {
        background: var(--color-deep-orange-opacity);

        #icon {
          color: var(--color-deep-orange);
        }
      }

      #header {
        color: var(--color-deep-orange);
      }

      #subtitle {
        color: #ffa70099;
      }
    }
  }
}
</style>
