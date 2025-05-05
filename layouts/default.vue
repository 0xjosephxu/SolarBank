<template>
  <div class="bg-black text-white min-h-svh flex flex-row">
    <SideBar />
    <div class="wrapper flex-grow flex flex-col">
      <NavBar />
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  background: var(--background-input);
}
</style>
