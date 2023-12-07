<template>
  <div>
    <canvas ref="myCanvas" class="myCanvas shadow-lg"></canvas>
  </div>
</template>

<script setup>
// Canvas Coordinate System 畫布的座標系操作
import { ref, onMounted, computed } from "vue";
const myCanvas = ref(null);
let ctx = ref();
const time = ref(0);
const sTime = computed(() => parseInt(time.value / 20));
let blockWidth = 200;
const PI = Math.PI;
const PI2 = Math.PI * 2;
const color = {
  red: "#F74456",
  white: "#FFF",
  yellow: "#F1DA56",
  blue: "#036FAF",
};

const init = () => {
  ctx = myCanvas.value.getContext("2d");
  myCanvas.value.width = blockWidth * 3;
  myCanvas.value.height = blockWidth * 3;
};
const drawBlock = (pos, bgColor, draw, time) => {
  ctx.save();
  ctx.translate(pos.x * blockWidth, pos.y * blockWidth);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, blockWidth, blockWidth);
  ctx.translate(100, 100);
  draw();
  ctx.restore();
};
const fillCircle = (x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, PI2);
  ctx.fill();
};
const draw = () => {
  time.value += 1;

  drawBlock(
    { x: 0, y: 0 },
    color.blue,
    function () {
      ctx.beginPath();
      ctx.arc(0, 0, 30 / ((sTime.value % 3) + 1), 0, PI2);
      ctx.strokeStyle = color.white;
      ctx.lineWidth = 15;
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = sTime.value % 8 == i ? color.red : color.white;
        if ((i + sTime.value) % 4 != 0) {
          ctx.fillRect(60, -4, 20, 8);
        }
        ctx.rotate(PI2 / 8);
      }
    },
    time.value
  );
  drawBlock(
    { x: 1, y: 0 },
    color.red,
    function () {
      ctx.save();
      ctx.scale(0.8, 0.8);
      ctx.translate(-60, -60);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        for (let o = 0; o < 3; o++) {
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, PI2);
          ctx.fillStyle =
            (i + o * 2 + sTime.value) % 5 == 0 ? color.yellow : color.white;
          ctx.fill();
          ctx.translate(0, 60);
        }
        ctx.restore();
        ctx.translate(60, 0);
      }
      ctx.restore();
    },
    time.value
  );
  drawBlock(
    { x: 2, y: 0 },
    color.yellow,
    function () {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(80, 20);
        ctx.lineTo(80, 80);
        ctx.closePath();
        ctx.fillStyle = color.white;
        ctx.fill();
        if (sTime.value % 4 == i) {
          ctx.beginPath();
          ctx.arc(60, 40, 6, 0, PI2);
          ctx.fillStyle = color.red;
          ctx.fill();
        }
        ctx.rotate(PI / 2);
      }
    },
    time.value
  );
  drawBlock({ x: 0, y: 1 }, color.yellow, function () {
    // 白正方形
    ctx.translate(-60, -60);
    ctx.fillStyle = color.white;
    ctx.fillRect(0, 0, 60, 60);
    // 紅拱型
    ctx.translate(30, 30);
    ctx.rotate(-PI / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.arc(40, 40, 40, -PI / 2, PI / 2);
    ctx.lineTo(0, 80);
    ctx.closePath();
    ctx.fillStyle = color.red;
    ctx.fill();
    // 藍長方形
    ctx.translate(-100 + 10 * Math.sin(time.value / 10), 60);
    ctx.fillStyle = color.blue;
    ctx.fillRect(0, 0, 100, 40);
    // 白長方形
    ctx.translate(100 + 10 * Math.cos(time.value / 10), 40);
    ctx.fillStyle = color.white;
    ctx.fillRect(0, 0, 50, 20);
  });
  drawBlock(
    { x: 1, y: 1 },
    color.white,
    function () {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      let angle1 = ((time.value % 100) / 100) * PI2;
      let angle2 = ((time.value % 50) / 50) * PI2;
      ctx.arc(0, 0, 80, angle1, angle2);
      ctx.fillStyle = color.red;
      ctx.fill();
      ctx.fillStyle = color.yellow;
      fillCircle(60, 60, 30);
    },
    time.value
  );
  drawBlock(
    { x: 2, y: 1 },
    color.blue,
    function () {
      ctx.fillStyle = color.white;
      fillCircle(0, 0, 80);
      ctx.rotate(time.value / 10);
      ctx.fillStyle = color.red;
      fillCircle(-30, 0, 20);
      ctx.rotate(time.value / 10);
      ctx.fillStyle = color.yellow;
      fillCircle(40, 0, 50);
    },
    time.value
  );
  drawBlock(
    { x: 0, y: 2 },
    color.red,
    function () {
      ctx.rotate(time.value / 100);
      for (let i = 0; i < 8; i++) {
        ctx.rotate(PI2 / 8);
        ctx.fillStyle = color.white;
        let r = 16;
        if ((sTime.value + i) % 4 < 2) {
          r = 10;
        }
        fillCircle(60, 0, r);
        ctx.fillStyle = color.blue;
        fillCircle(30, 5, 5);
      }
    },
    time.value
  );
  drawBlock(
    { x: 1, y: 2 },
    color.blue,
    function () {
      // 黃長方形
      ctx.translate(-80, -100);
      ctx.fillStyle = color.yellow;
      ctx.fillRect(0, time.value % 200, 40, time.value % 200);
      // 紅長方形
      ctx.translate(40, 40);
      ctx.fillStyle = color.red;
      ctx.fillRect(0, 0, 120, 80);
      // 白小圈*2
      ctx.fillStyle = color.white;
      fillCircle(0, 40, sTime.value % 20);
      fillCircle(70, 40, sTime.value % 10);
      // 白長方形
      ctx.translate(70, 80);
      ctx.fillRect(0, 0, 50, 80);
    },
    time.value
  );
  drawBlock(
    { x: 2, y: 2 },
    color.yellow,
    function () {
      ctx.beginPath();
      ctx.moveTo(-100, -100);
      ctx.lineTo(0, -100);
      ctx.lineTo(-100, 100);
      ctx.closePath();
      ctx.fillStyle = color.white;
      ctx.fill();

      ctx.rotate(PI);

      ctx.save();
      ctx.translate(time.value % 100, 0);
      ctx.beginPath();
      ctx.moveTo(-100, -100);
      ctx.lineTo(0, -100);
      ctx.lineTo(-100, 100);
      ctx.closePath();
      ctx.fillStyle = color.red;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(-100, -100);
      ctx.lineTo(0, -100);
      ctx.lineTo(-100, 100);
      ctx.closePath();
      ctx.fillStyle = color.white;
      ctx.fill();
    },
    time.value
  );
  requestAnimationFrame(draw);
};
onMounted(() => {
  init();
  requestAnimationFrame(draw);
  // draw();
});
</script>

<style scoped></style>
