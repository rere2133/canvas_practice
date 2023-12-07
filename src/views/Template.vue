<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const myCanvas = ref(null);
let ctx = ref();
// const time = ref(0);
// const mouse = ref({});

const init = () => {
  myCanvas.value.width = 400;
  myCanvas.value.height = 400;
  ctx = myCanvas.value.getContext("2d");
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
  setInterval(draw, 30);
  // draw();
});
</script>

<style scoped></style>
