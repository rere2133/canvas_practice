import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import * as dat from 'dat.gui';

export function useBall() {
  const ww = computed(() => window.innerWidth)
  const wh = computed(() => window.innerHeight)
  const p = ref({
    x: ww.value / 2,
    y: wh.value / 2
  })
  const v = ref({
    x: 50,
    y: 3
  })
  const a = ref({
    x: 0,
    y: 1
  })
  const r = ref(50)
  const dragging = ref(false)

  const controls = ref({
    vx: 0,
    vy: 0,
    ay: 0.6,
    fade: 0.99,
    update: true,
    color: '#fff',
    step: () => update(),
    FPS: 30
  })
  let controller
  /* dat.gui */
  const gui = new dat.GUI()
  const initGui = () => {
    gui.add(controls.value, "vx", -50, 50).listen().onChange((value) => {
      v.value.x = value
    })
    gui.add(controls.value, "vy", -50, 50).listen().onChange((value) => {
      v.value.y = value
    })
    gui.add(controls.value, "ay", -1, 1).step(0.001).listen().onChange((value) => {
      a.value.y = value
    })
    gui.add(controls.value, "fade", 0, 1).step(0.01).listen()
    gui.add(controls.value, "update")
    gui.addColor(controls.value, "color")
    gui.add(controls.value, "step")
    gui.add(controls.value, "FPS", 1, 120)
  }
  const closeGui = () => {
    gui.hide()
  }


  const draw = (ctx) => {
    ctx.beginPath()
    ctx.save()
    ctx.translate(p.value.x, p.value.y)
    ctx.arc(0, 0, r.value, 0, Math.PI * 2)
    ctx.fillStyle = controls.value.color
    ctx.fill()
    ctx.restore()

    drawV(ctx)
  }

  const drawV = (ctx) => {
    ctx.beginPath()
    ctx.save()
    ctx.translate(p.value.x, p.value.y)
    ctx.scale(3, 3)
    ctx.moveTo(0, 0)
    ctx.lineTo(v.value.x, v.value.y)
    ctx.strokeStyle = "blue"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(v.value.x, 0)
    ctx.strokeStyle = "red"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, v.value.y)
    ctx.strokeStyle = "green"
    ctx.stroke()

    ctx.restore()
  }

  const update = () => {
    if (dragging.value) return
    p.value.x += v.value.x
    p.value.y += v.value.y

    v.value.x += a.value.x
    v.value.y += a.value.y

    v.value.x *= controls.value.fade
    v.value.y *= controls.value.fade

    //new dat
    controls.value.vx = v.value.x
    controls.value.vy = v.value.y
    controls.value.ay = a.value.y
    checkBoundary()
  }

  const checkBoundary = () => {
    if (p.value.x + r.value > ww.value) {
      v.value.x = -Math.abs(v.value.x)
    }
    if (p.value.x - r.value < 0) {
      v.value.x = Math.abs(v.value.x)
    }
    if (p.value.y + r.value > wh.value) {
      v.value.y = -Math.abs(v.value.y)
    }
    if (p.value.y - r.value < 0) {
      v.value.y = Math.abs(v.value.y)
    }
  }
  // const { name } = useRoute()
  // watch(() => name, (val) => {
  //   if (val == 'Acceleration') {
  //     console.log('jhi');
  //     initGui()
  //   } else {
  //     console.log('hji');
  //     // closeGui()
  //   }
  // }, {
  //   immediate: true
  // })

  return {
    p,
    v,
    r,
    dragging,
    draw,
    update,
    controls,
    initGui,
    closeGui
  }
}