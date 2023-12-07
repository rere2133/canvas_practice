<template>
  <div>
    <canvas class="myCanvas shadow-lg" ref="myCanvas"></canvas>
  </div>
</template>

<script setup>
// 繪圖基礎語法 與動畫原理
import { ref, onMounted } from "vue";
const myCanvas = ref(null);
let ctx = ref();
const time = ref(0);
const mouse = ref({});

const init = () => {
  myCanvas.value.width = 400;
  myCanvas.value.height = 400;
  ctx = myCanvas.value.getContext("2d");
  myCanvas.value.addEventListener("mousemove", function (event) {
    mouse.value.x = event.offsetX;
    mouse.value.y = event.offsetY;
  });
};
const draw = () => {
  time.value += 1;
  ctx.clearRect(0, 0, 400, 400);
  // 殘影
  // ctx.fillStyle = "rgba(255,255,255,0.2)";
  // ctx.fillRect(0, 0, 400, 400);
  // // -- Fill --
  // ctx.fillStyle = "red";
  // ctx.fillRect(100, 100, 200, 200);
  // ctx.fillRect(300, 300, 100, 100);

  // // -- Stroke --
  // ctx.strokeStyle = "red";
  // ctx.strokeRect(100, 100, 200, 200);
  // ctx.strokeRect(300, 300, 100, 100);

  // // -- Path --
  // ctx.beginPath();
  // ctx.moveTo(100, 100);
  // ctx.lineTo(300, 100);
  // ctx.lineTo(300, 200);
  // ctx.lineTo(100, 300);
  // ctx.closePath();
  // ctx.fill();

  // // -- Circle-arc --
  // // ctx.arc(x, y, r, startAngle, endAngle, false); 預設false 逆時針;true順時針
  // ctx.beginPath();
  // ctx.arc(200, 200, 100, 0, 2 * Math.PI);
  // ctx.fill();

  // --fillText--
  // ctx.fillText('文字',x,y)

  // **　Small Project **
  // Bg
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    let pos = i * 50;
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, 400);
    ctx.fillText(pos, pos, 10);
    ctx.moveTo(0, pos);
    ctx.lineTo(400, pos);
    ctx.fillText(pos, 1, pos);
  }
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.stroke();

  //　Horizon
  ctx.beginPath();
  ctx.moveTo(25, 350);
  ctx.lineTo(375, 350);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Red Rec
  ctx.fillStyle = "#f74747";
  ctx.fillRect(300, 300, 50, 50);
  ctx.strokeRect(300, 300, 50, 50);
  ctx.fill();

  // Yellow Rec
  ctx.beginPath();
  ctx.rect(250, 250, 50, 100);
  ctx.rect(50, 300, 50, 50);
  ctx.fillStyle = "#ffef60";
  ctx.fill();
  ctx.stroke();

  // Orange Rec
  ctx.beginPath();
  ctx.rect(200, 250, 50, 100);
  ctx.rect(100, 250, 50, 100);
  ctx.fillStyle = "#f7bd2a";
  ctx.fill();
  ctx.stroke();

  //  Arch
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(250, 200);
  ctx.lineTo(250, 250);
  ctx.lineTo(200, 250);
  ctx.arc(175, 250, 25, 0, Math.PI, true);
  ctx.lineTo(100, 250);
  ctx.closePath();
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.stroke();

  // Roof
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(175, 150);
  ctx.lineTo(250, 200);
  ctx.closePath();
  ctx.fillStyle = "#f74747";
  ctx.fill();
  ctx.stroke();

  // Flag
  ctx.beginPath();
  ctx.moveTo(175, 150);
  ctx.lineTo(175, 100 - mouse.value.y / 5);
  ctx.lineTo(200, 110 - (time.value % 5) - mouse.value.y / 5);
  ctx.lineTo(175, 120 - mouse.value.y / 5);

  ctx.closePath();
  ctx.fillStyle = `hsl(${mouse.value.x % 360},50%,80%)`;
  ctx.fill();
  ctx.stroke();

  // Car
  let carX = (time.value % 440) - 40;
  // let carX = 401;
  ctx.fillStyle = `hsl(${mouse.value.x % 360},50%,80%)`;
  ctx.fillRect(carX, 325, 40, 25);
  ctx.strokeRect(carX, 325, 40, 25);

  ctx.beginPath();
  ctx.arc(carX + 10, 350, 5, 0, 2 * Math.PI);
  ctx.arc(carX + 30, 350, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(mouse.value.x, mouse.value.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
};
onMounted(() => {
  init();
  setInterval(draw, 30);
  // draw();
});
</script>

<style scoped></style>
