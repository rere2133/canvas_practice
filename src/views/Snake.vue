<template>
  <div class="relative">
    <div
      v-if="!game.start"
      class="absolute flex justify-center items-center flex-col w-full h-[600px]"
    >
      <h2 class="text-5xl text-white mb-4">Score: {{ score }}</h2>
      <div
        @click="startGame(ctx)"
        class="bg-black text-white border-2 py-1 px-3 border-white-100 max-w-[120px] text-sm rounded-full cursor-pointer hover:bg-slate-50 hover:text-slate-900"
      >
        Start Game
      </div>
    </div>
    <canvas class="myCanvas" ref="myCanvas"> </canvas>
    <!-- For Test -->
    <div class="mx-auto mt-5">
      <div class="flex gap-2 mb-2 justify-center">
        <div class="btn opacity-0"></div>
        <div @click="setDirection('Up')" class="btn">↑</div>
        <div class="btn opacity-0"></div>
      </div>
      <div class="flex gap-2 justify-center">
        <div @click="setDirection('Left')" class="btn">←</div>
        <div @click="setDirection('Down')" class="btn">↓</div>
        <div @click="setDirection('Right')" class="btn">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useSnakeGame } from "@/composables/useSnakeGame";
const myCanvas = ref(null);
let ctx = ref();
const snakeGame = useSnakeGame();
const { score, game, setDirection, startGame } = snakeGame;

const init = () => {
  myCanvas.value.width =
    game.value.blockWidth * game.value.gameWidth +
    game.value.blockGap * (game.value.gameWidth - 1);
  myCanvas.value.height = myCanvas.value.width;
  ctx = myCanvas.value.getContext("2d");

  snakeGame.render(ctx, myCanvas.value.width, myCanvas.value.height);
  snakeGame.update(ctx);
  snakeGame.generateFood(ctx);
};
const handleKeydown = (e) => {
  if (e.key.indexOf("Arrow") != -1) {
    setDirection(e.key.replace("Arrow", ""));
  }
  if (e.key == "Enter") {
    startGame(ctx);
  }
};
onMounted(() => {
  init();
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.btn {
  @apply text-2xl w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center shadow-xl active:bg-gray-400 active:shadow-sm cursor-pointer;
}
</style>
