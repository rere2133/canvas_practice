<template>
  <div>
    <h1 class="text-5xl">My Canvas</h1>
    <div class="min-h-[200px] p-4">
      <div class="max-w-[300px] mx-auto">
        <span v-for="link in links">
          <router-link :to="link.path">{{ link.name }}</router-link> |
        </span>
      </div>

      <div class="flex m-8 flex-wrap">
        <!-- <Basic @click="router.push('/basic')" class="galleryItem" />
        <Coordinate @click="router.push('/coordinate')" class="galleryItem" />
        <Acceleration
          @click="router.push('/acceleration')"
          class="galleryItem"
        /> -->
        <component
          class="galleryItem"
          v-for="(item, idx) in gallery"
          :key="idx"
          :is="item"
          @click="navigateToItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import { useRouter } from "vue-router";
import Basic from "./Basic.vue";
import Coordinate from "./Coordinate.vue";
import Acceleration from "./Acceleration.vue";
import Snake from "./Snake.vue";
import Particle from "./Particle.vue";

const router = useRouter();
const links = ref([
  { name: "Basic", path: "/basic" },
  { name: "Coordinate", path: "/coordinate" },
  { name: "Acceleration", path: "/acceleration" },
  { name: "Vector", path: "/vector" },
  { name: "Snake", path: "/snake" },
  { name: "Particle", path: "/particle" },
  // { name: "Template", path: "/template" },
]);
const gallery = ref([
  markRaw(Basic),
  markRaw(Coordinate),
  markRaw(Acceleration),
  markRaw(Snake),
  markRaw(Particle),
]);

const navigateToItem = (item) => {
  const path = getItemPath(item);
  if (path) {
    router.push(path);
  }
};
const getItemPath = (name) => {
  let path = links.value.find((link) => link.name == name.__name);
  return path || "";
};
</script>

<style scoped>
.galleryItem {
  @apply px-2 mb-6 shadow-lg w-[200px] aspect-square  mx-auto overflow-hidden;
}
</style>
