import { ref, computed, onMounted, watch } from "vue";
import Vector from "./useVector";
import * as dat from 'dat.gui';

export default class Particle {
  constructor(ctx, args) {
    let def = {
      p: new Vector(),
      v: new Vector(),
      a: new Vector(),
      r: 10,
      color: '#fff'
    }
    Object.assign(def, args)
    Object.assign(this, def)
    // this.ctx = ctx
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.p.x, this.p.y)
    ctx.beginPath()
    ctx.arc(0, 0, this.r, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}