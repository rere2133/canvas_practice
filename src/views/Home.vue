<template>
  <div>
    <h1 class="text-5xl">My Canvas</h1>
    <div class="min-h-[200px] p-4">
      <div class="max-w-[300px] mx-auto">
        <router-link to="/basic">Basic Note</router-link> |
        <router-link to="/coordinate">Coordinate</router-link> |
        <router-link to="/acceleration">Acceleration</router-link> |
        <router-link to="/vector">Vector</router-link>
      </div>

      <div class="flex gap-4 m-8">
        <Basic @click="router.push('/basic')" class="galleryItem" />
        <Coordinate @click="router.push('/coordinate')" class="galleryItem" />
        <Acceleration
          @click="router.push('/acceleration')"
          class="galleryItem"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Basic from "./Basic.vue";
import Coordinate from "./Coordinate.vue";
import Acceleration from "./Acceleration.vue";

const router = useRouter();
</script>

<style scoped>
.galleryItem {
  @apply max-w-[200px] h-fit shadow-lg;
}
</style>
