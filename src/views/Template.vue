<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import * as dat from "dat.gui";
import Vector from "@/composables/useVector";
import { useCanvas } from "@/composables/useCanvas";

const myCanvas = ref(null);
let ctx = ref(null);
let _useCanvas = ref(null);
// --- 環境變數 ---
const updateFPS = ref(30);
const showMouse = ref(true);
const mousePos = ref(new Vector(0, 0));
const mousePosDown = ref(new Vector(0, 0));
const mousePosUp = ref(new Vector(0, 0));
const bgColor = ref("black");
// --- 控制 ---
const ww = computed(() => window.innerWidth);
const wh = computed(() => window.innerHeight);

/* dat.gui start */
const controls = ref({
  value: 0,
});
const gui = new dat.GUI();
const initGui = () => {
  gui
    .add(controls.value, "value", -2, 2)
    .listen()
    .onChange((value) => {});
};
const closeGui = () => {
  gui.hide();
};
/* dat.gui end */
const initCanvas = () => {
  myCanvas.value.width = window.innerWidth;
  myCanvas.value.height = window.innerHeight;
  ctx = myCanvas.value.getContext("2d");
  _useCanvas = useCanvas(ctx);
};
// 滑鼠
const initMouse = () => {
  myCanvas.value.addEventListener("mousemove", mousemove);
  myCanvas.value.addEventListener("mousedown", mousedown);
  myCanvas.value.addEventListener("mouseup", mouseup);
};
const mousemove = (e) => {
  mousePos.value.set(e.x, e.y);
  // console.log(mousePos.value);
};
const mousedown = (e) => {
  mousePosDown.value = mousePos.value.clone();
  // console.log(mousePosDown.value);
};
const mouseup = (e) => {
  mousePosUp.value = mousePos.value.clone();
  // console.log(mousePosUp.value);
};

// 邏輯初始化
const init = () => {
  initGui();
  initCanvas();
  initMouse();
  window.addEventListener("resize", initCanvas);
};
// 遊戲邏輯更新
const update = () => {};
// 畫面更新
const draw = () => {
  // time.value += 1;
  // ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = bgColor.value;
  ctx.fillRect(0, 0, ww.value, wh.value);
  //  -----------------------------
  // 在這裡繪製

  // ctx.fillStyle = "red";
  // _useCanvas.circle(new Vector(ww.value / 2, wh.value / 2), 300);
  // ctx.fill();

  //  -----------------------------
  // 滑鼠
  ctx.fillStyle = "red";
  ctx.beginPath();
  _useCanvas.circle(mousePos.value, 3);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.translate(mousePos.value.x, mousePos.value.y);
  ctx.strokeStyle = "red";
  let len = 20;
  _useCanvas.line(new Vector(-len, 0), new Vector(len, 0));
  ctx.fillText(mousePos.value, 10, -10);
  ctx.rotate(Math.PI / 2);
  _useCanvas.line(new Vector(-len, 0), new Vector(len, 0));
  ctx.stroke();
  ctx.restore();

  requestAnimationFrame(draw);
};
onMounted(() => {
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / updateFPS.value);
});
onUnmounted(() => {
  closeGui();
});
</script>

<style scoped></style>
