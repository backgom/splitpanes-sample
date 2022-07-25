<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => {
  return route.path === '/'
    ? 'LogoLayout'
    : route.meta.layout || 'DefaultLayout';
});
</script>

<style lang="scss" scoped></style>
