<template>
  <div>
    <canvas class="myCanvas" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import { useBall } from "@/composables/useBall_vector";
import Vector from "@/composables/useVector";
import { useHelper } from "@/composables/useHelper";
import { useRoute } from "vue-router";

const { name } = useRoute();

const myCanvas = ref(null);
let ctx = ref();
const ww = computed(() => window.innerWidth);
const wh = computed(() => window.innerHeight);

const _useBall = useBall();
const { p, v, r, dragging, controls } = _useBall;
const { getDistance } = useHelper();
const mouse = ref({});

const init = () => {
  ctx = myCanvas.value.getContext("2d");
  myCanvas.value.width = ww.value;
  myCanvas.value.height = wh.value;
  window.addEventListener("resize", function () {
    myCanvas.value.width = ww.value;
    myCanvas.value.height = wh.value;
  });

  myCanvas.value.addEventListener("mousedown", function (e) {
    mouse.value = new Vector(e.x, e.y);
    let dist = mouse.value.sub(p.value).length();
    if (dist < r.value) {
      console.log("ball clicked");
      dragging.value = true;
    }
  });
  myCanvas.value.addEventListener("mousemove", function (e) {
    let nowPos = new Vector(e.x, e.y);
    if (dragging.value) {
      let delta = nowPos.sub(mouse.value);
      p.value = p.value.add(delta);
      v.value = delta.clone();
    }
    let dist = getDistance(nowPos, p.value);
    if (dist < r.value) {
      myCanvas.value.style.cursor = "move";
    } else {
      myCanvas.value.style.cursor = "initial";
    }
    mouse.value = nowPos;
  });
  myCanvas.value.addEventListener("mouseup", function (e) {
    dragging.value = false;
  });
};

const draw = () => {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, ww.value, wh.value);

  _useBall.draw(ctx);
  setTimeout(draw, 1000 / controls.value.FPS);
};
const update = () => {
  if (controls.value.update) {
    _useBall.update();
  }
};

onMounted(() => {
  init();
  // requestAnimationFrame(draw);
  draw();
  setInterval(update, 1000 / 30);
});
onUnmounted(() => {
  clearInterval(update);
  _useBall.closeGui();
});

watch(
  () => name,
  (val) => {
    if (val == "Acceleration") {
      _useBall.initGui();
    } else {
      _useBall.closeGui();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
/* .myCanvas {
  background: #222;
} */
</style>
