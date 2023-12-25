import { ref } from "vue"
import * as dat from 'dat.gui';

export function useGui() {
  const controls = ref({
    value: 0
    // vx: 0,
    // vy: 0,
    // ay: 0.6,
    // fade: 0.99,
    // update: true,
    // color: '#fff',
    // step: () => update(),
    // FPS: 30
  })
  const gui = new dat.GUI()
  const initGui = () => {
    gui.add(controls.value, "value", -2, 2).listen().onChange((value) => {
    })
    // gui.add(controls.value, "vy", -50, 50).listen().onChange((value) => {
    //   v.value.y = value
    // })
    // gui.add(controls.value, "ay", -1, 1).step(0.001).listen().onChange((value) => {
    //   a.value.y = value
    // })
    // gui.add(controls.value, "fade", 0, 1).step(0.01).listen()
    // gui.add(controls.value, "update")
    // gui.addColor(controls.value, "color")
    // gui.add(controls.value, "step")
    // gui.add(controls.value, "FPS", 1, 120)
  }
  const closeGui = () => {
    gui.hide()
  }

  return {
    controls,
    gui,
    // initGui,
    closeGui
  }
}