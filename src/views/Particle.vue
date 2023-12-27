<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import * as dat from "dat.gui";
import Vector from "@/composables/useVector";
import Particle from "../composables/useParticle";
import { useCanvas } from "@/composables/useCanvas";
import { useRoute } from "vue-router";

const { name } = useRoute();
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
  ay: 0.6,
  fade: 0.95,
  v: 10,
});
const gui = new dat.GUI();
const initGui = () => {
  gui
    .add(controls.value, "gcount", 0, 30)
    .step(1)
    .onChange((value) => {});
  gui
    .add(controls.value, "ay", -1, 1)
    .step(0.01)
    .onChange((value) => {});
  gui
    .add(controls.value, "fade", 0, 1)
    .step(0.01)
    .onChange((value) => {});
  gui
    .add(controls.value, "v", 0, 30)
    .step(0.01)
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
  // initGui();
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
        v: new Vector(
          Math.random() * controls.value.v - controls.value.v / 2,
          Math.random() * controls.value.v - controls.value.v / 2
        ),
        r: Math.random() * 20,
        color: `rgb(${parseInt(Math.random() * 255)},${parseInt(
          Math.random() * 255
        )},255`,
      });
    })
  );
  particles.value.forEach((el) => {
    el.update(controls.value);
  });
  particles.value = particles.value.filter((p) => p.r > 0.1);
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
    el.draw();
  });

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
watch(
  () => name,
  (val) => {
    if (val == "Home") {
      closeGui();
    } else {
      initGui();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
