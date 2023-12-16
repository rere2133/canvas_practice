<template>
  <div>
    <h1 class="text-5xl">My Canvas</h1>
    <div class="min-h-[200px] p-4">
      <div class="max-w-[300px] mx-auto">
        <span v-for="link in links">
          <router-link :to="link.path">{{ link.name }}</router-link> |
        </span>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Basic from "./Basic.vue";
import Coordinate from "./Coordinate.vue";
import Acceleration from "./Acceleration.vue";

const router = useRouter();
const links = ref([
  { name: "Basic Note", path: "/basic" },
  { name: "Coordinate", path: "/coordinate" },
  { name: "Acceleration", path: "/acceleration" },
  { name: "Vector", path: "/vector" },
  { name: "Snake", path: "/snake" },
]);
</script>

<style scoped>
.galleryItem {
  @apply max-w-[200px] h-fit shadow-lg;
}
</style>
g
