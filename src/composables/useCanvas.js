
export function useCanvas(ctx) {
  // console.log({ ctx });
  const circle = (v, r) => {
    ctx.arc(v.x, v.y, r, 0, Math.PI * 2)
  }
  const line = (v1, v2) => {
    ctx.moveTo(v1.x, v1.y)
    ctx.lineTo(v2.x, v2.y)
  }
  return {
    circle,
    line
  }
}