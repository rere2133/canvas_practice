<template>
  <div>
    <h1 class="text-5xl">Home Page</h1>
    <div class="min-h-[200px] p-4">
      <router-link to="/basic">Basic Note</router-link> |
      <router-link to="/coordinate">Coordinate</router-link>
      <div class="flex gap-4 m-8">
        <Basic class="galleryItem" />
        <Coordinate class="galleryItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Basic from "./Basic.vue";
import Coordinate from "./Coordinate.vue";
</script>

<style scoped>
.galleryItem {
  @apply max-w-[200px] shadow-lg;
}
</style>
