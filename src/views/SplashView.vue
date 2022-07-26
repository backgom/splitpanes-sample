<template>
  <div>SplashView</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  setTimeout(
    (router) => {
      router.push({ name: 'home' });
    },
    5000,
    useRouter()
  );
});
</script>

<style lang="scss" scoped></style>
