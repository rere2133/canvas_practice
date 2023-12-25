<script setup lang="ts"></script>

<template>
  <div class="w-full h-[44px] bg-slate-700 fixed top-0 left-0 flex z-0">
    <router-link
      to="/"
      class="bg-slate-700 px-4 py-2 text-xl font-bold text-slate-100"
    >
      Home
    </router-link>
  </div>
  <router-view />
</template>

<style scoped lang="scss"></style>
