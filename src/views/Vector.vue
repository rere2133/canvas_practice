<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Vector from "@/composables/useVector";

const myCanvas = ref(null);
let ctx = ref();
const ww = computed(() => window.innerWidth);
const wh = computed(() => window.innerHeight);
const mouse = ref();

const init = () => {
  myCanvas.value.width = ww.value;
  myCanvas.value.height = wh.value;
  ctx = myCanvas.value.getContext("2d");
  myCanvas.value.addEventListener("mousemove", function (event) {
    mouse.value = new Vector(event.x, event.y);
  });
};
const drawVector = (v, trans) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.save();
  ctx.rotate(v.angle());
  ctx.fillText(v, v.length() / 2 - 16, 12);
  ctx.lineWidth = 5;
  ctx.lineTo(v.length(), 0);
  ctx.lineTo(v.length() - 5, -4);
  ctx.lineTo(v.length() - 5, 4);
  ctx.lineTo(v.length(), 0);
  ctx.strokeStyle = "#222";
  ctx.stroke();
  ctx.restore();
  if (trans) {
    ctx.translate(v.x, v.y);
  }
};
const draw = () => {
  ctx.clearRect(0, 0, ww.value, wh.value);
  //// Method Pactice
  // let a = new Vector(4, 0);
  // let b = new Vector(0, 3);
  // let c = a.add(b);
  // let d = a.sub(b);
  // console.log(`${a}+${b}=${c}`);
  // console.log(`${a}-${b}=${d}`);
  // let b2 = b.mul(2);
  // console.log(`${b}*2=${b2}`);
  // console.log(`${c} length: ${c.length()}`);
  // d.set(0, 6);
  // console.log(b2.equal(d));
  // let newa = a.clone();
  // newa.move(3, 4);
  // console.log(newa, a);

  // // Draw Vector
  // let v1 = new Vector(250, 250);
  // let v2 = new Vector(0, 200);
  // let v3 = v1.add(v2).mul(-1);
  // ctx.translate(ww.value / 2, wh.value / 2);
  // drawVector(v1, true);
  // drawVector(v2, true);
  // drawVector(v3, true);

  // Vector Arrow
  let c = new Vector(ww.value / 2, wh.value / 2);
  if (mouse.value?.x) {
    ctx.save();
    ctx.translate(ww.value / 2, wh.value / 2);
    let md = mouse.value.sub(c);
    drawVector(md.mul(1 / md.length()).mul(150), false);
    ctx.restore();
  }
};
onMounted(() => {
  init();
  setInterval(draw, 30);
  // setTimeout(draw, 0);
  // draw();
});
</script>

<style scoped></style>
