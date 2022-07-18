<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="#" class="link" @click="() => openWindow('/about?mode=popup')"
          >About (Popup)</a
        >
        <RouterLink to="/splitpanes">Splitpanes</RouterLink>
      </nav>
    </div>
  </header>
  <div>
    <slot />
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue';

function openWindow(url) {
  window.open(url, 'Popup', 'width=700,height=500');
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>
