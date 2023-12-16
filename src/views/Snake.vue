<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
    <!-- For Test -->
    <input @keydown.down="setDirection('Down')" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Vector from "@/composables/useVector";
import { useSnakeGame } from "@/composables/useSnakeGame";
const myCanvas = ref(null);
let ctx = ref();
const snakeGame = useSnakeGame();
const { game, setDirection } = snakeGame;

const init = () => {
  myCanvas.value.width =
    game.value.blockWidth * game.value.gameWidth +
    game.value.blockGap * (game.value.gameWidth - 1);
  myCanvas.value.height = myCanvas.value.width;
  ctx = myCanvas.value.getContext("2d");

  snakeGame.render(ctx, myCanvas.value.width, myCanvas.value.height);
  snakeGame.update();
  // myCanvas.value.addEventListener("mousemove", function (event) {
  //   mouse.value.x = event.offsetX;
  //   mouse.value.y = event.offsetY;
  // });
};
const draw = () => {
  // time.value += 1;
  // ctx.clearRect(0, 0, 400, 400);
};
onMounted(() => {
  init();
  // setInterval(draw, 30);
  draw();
});
</script>

<style scoped></style>
