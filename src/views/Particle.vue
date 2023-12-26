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
import Particle from "../composables/useParticle";

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
const particles = ref([]);
// --- 控制 ---
const ww = computed(() => window.innerWidth);
const wh = computed(() => window.innerHeight);

/* dat.gui start */
const controls = ref({
  value: 0,
  gcount: 3,
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
const update = () => {
  particles.value = particles.value.concat(
    Array.from({ length: controls.value.gcount }, (d, idx) => {
      return new Particle(ctx, {
        p: mousePos.value.clone(),
      });
    })
  );
};
// 畫面更新
const draw = () => {
  // time.value += 1;
  // ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = bgColor.value;
  ctx.fillRect(0, 0, ww.value, wh.value);
  //  -----------------------------
  // 在這裡繪製

  particles.value.forEach((el) => {
    el.draw(ctx);
  });

  // ctx.save();
  // ctx.translate(mousePos.value.x, mousePos.value.y);

  // ctx.beginPath();
  // ctx.arc(0, 0, 10, 0, Math.PI * 2);
  // ctx.fillStyle = "#fff";
  // // _useCanvas.circle(mousePos.value, 10);

  // ctx.fill();

  // // ctx.fillStyle = "red";
  // // _useCanvas.circle(new Vector(ww.value / 2, wh.value / 2), 300);
  // // ctx.fill();

  // ctx.restore();

  //  -----------------------------

  requestAnimationFrame(draw);
};
onMounted(() => {
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / updateFPS.value);
  // update();
  // draw();
});
onUnmounted(() => {
  closeGui();
});
</script>

<style scoped></style>
