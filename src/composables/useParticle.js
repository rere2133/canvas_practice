import { ref, computed, onMounted, watch } from "vue";
import Vector from "./useVector";
import * as dat from 'dat.gui';

let _ctx
let ww = window.innerWidth
let wh = window.innerHeight

export default class Particle {
  constructor(ctx, args) {
    let def = {
      p: new Vector(),
      v: new Vector(1, 0),
      a: new Vector(),
      r: 10,
      color: '#fff'
    }
    Object.assign(def, args)
    Object.assign(this, def)
    _ctx = ctx
  }
  draw() {
    _ctx.save()
    _ctx.translate(this.p.x, this.p.y)
    _ctx.beginPath()
    _ctx.arc(0, 0, this.r, 0, Math.PI * 2)
    _ctx.fillStyle = this.color
    _ctx.fill()
    _ctx.restore()
  }
  update(controls) {
    this.p = this.p.add(this.v)
    this.v = this.v.add(this.a)
    this.v = this.v.move(0, controls.ay)
    this.v = this.v.mul(0.99)
    this.r *= controls.fade
    if (this.p.y + this.r > wh) {
      this.v.y = -Math.abs(this.v.y)
    }
    if (this.p.x + this.r > ww) {
      this.v.x = -Math.abs(this.v.x)
    }
    if (this.p.y - this.r < 0) {
      this.v.y = Math.abs(this.v.y)
    }
    if (this.p.y - this.r < 0) {
      this.v.x = Math.abs(this.v.x)
    }
  }
}