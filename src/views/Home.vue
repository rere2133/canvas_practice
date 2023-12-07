<template>
  <div>
    <h1 class="text-5xl">Home Page</h1>
    <div class="min-h-[200px] p-4">
      <router-link to="/basic">Basic Note</router-link> |
      <router-link to="/coordinate">Coordinate</router-link>
      <div class="flex gap-4 m-8">
        <Basic @click="router.push('/basic')" class="galleryItem" />
        <Coordinate @click="router.push('/coordinate')" class="galleryItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Basic from "./Basic.vue";
import Coordinate from "./Coordinate.vue";

const router = useRouter();
</script>

<style scoped>
.galleryItem {
  @apply max-w-[200px] shadow-lg;
}
</style>
