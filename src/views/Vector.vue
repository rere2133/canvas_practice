<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Vector from "@/composables/useVector";

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
  let a = new Vector(4, 0);
  let b = new Vector(0, 3);
  let c = a.add(b);
  let d = a.sub(b);
  console.log(`${a}+${b}=${c}`);
  console.log(`${a}-${b}=${d}`);
  let b2 = b.mul(2);
  console.log(`${b}*2=${b2}`);
  console.log(`${c} length: ${c.length()}`);
  d.set(0, 6);
  console.log(b2.equal(d));
  let newa = a.clone();
  newa.move(3, 4);
  console.log(newa, a);

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
