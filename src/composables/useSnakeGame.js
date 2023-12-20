import Vector from './useVector'
import { ref } from 'vue'
import * as Tone from 'tone'

export function useSnakeGame() {
  // Snake
  const snake = ref({
    body: [],
    maxLength: 5,
    head: new Vector(),
    speed: new Vector(1, 0),
    direction: 'Right'
  })
  const snakeUpdate = () => {
    let newHead = snake.value.head.add(snake.value.speed)
    snake.value.body.push(snake.value.head)
    snake.value.head = newHead
    while (snake.value.body.length > snake.value.maxLength) {
      snake.value.body.shift()
    }
  }
  const setDirection = (dir) => {
    // console.log(dir);
    let target
    switch (dir) {
      case 'Up':
        target = new Vector(0, -1)
        break;
      case 'Down':
        target = new Vector(0, 1)
        break;
      case 'Left':
        target = new Vector(-1, 0)
        break;
      case 'Right':
        target = new Vector(1, 0)
        break;
    }
    if (target.equal(snake.value.speed.mul(-1)) == false) {
      snake.value.speed = target
    }
  }
  const checkBoundary = () => {
    let xInRange = 0 <= snake.value.head.x && snake.value.head.x < game.value.gameWidth + 1
    let yInRange = 0 <= snake.value.head.y && snake.value.head.y < game.value.gameWidth + 1
    console.log();
    return xInRange && yInRange
  }

  // Game
  const score = ref(0)
  const game = ref({
    blockWidth: 12, //小格子寬度
    blockGap: 2, //格子間寬度
    gameWidth: 40, // 遊戲邊長有幾個格子
    speed: 30,
    foods: [],
    start: false
  })
  // 遊戲開始
  const startGame = () => {
    game.value.start = true
  }
  // 遊戲結束
  const endGame = () => {
    game.value.start = false
    score.value = (snake.value.body.length - 5) * 10
    snake.value = {
      body: [],
      maxLength: 5,
      head: new Vector(),
      speed: new Vector(1, 0),
      direction: 'Right'
    }
  }
  // 尋找實際向量位置
  const getPosition = (x, y) => {
    return new Vector
      (x * game.value.blockWidth + (x - 1) * game.value.blockGap,
        y * game.value.blockWidth + (y - 1) * game.value.blockGap)
  }
  // 畫格子
  const drawBlock = (ctx, v, color) => {
    ctx.fillStyle = color
    let pos = getPosition(v.x, v.y)
    ctx.fillRect(pos.x, pos.y, game.value.blockWidth, game.value.blockWidth)
  }
  // 食物產生時的效果
  const drawEffect = (ctx, x, y) => {
    let r = 2
    let pos = getPosition(x, y)
    const effect = () => {
      r++
      ctx.strokeStyle = `rgba(255,0,0,${(100 - r) / 100})`
      ctx.beginPath()
      ctx.arc(pos.x + game.value.blockWidth / 2, pos.y + game.value.blockWidth / 2, r, 0, Math.PI * 2)
      ctx.stroke()
      if (r < 100) {
        requestAnimationFrame(effect)
      }
    }
    requestAnimationFrame(effect)
  }

  // 產生食物
  const generateFood = (ctx) => {
    let x = parseInt(Math.random() * game.value.gameWidth)
    let y = parseInt(Math.random() * game.value.gameWidth)
    game.value.foods.push(new Vector(x, y))
    drawEffect(ctx, x, y)
  }
  // 音效
  const playSound = (note, volume, when) => {
    setTimeout(() => {
      let synth = new Tone.Synth().toDestination()
      synth.Volume = volume || -12
      synth.triggerAttackRelease(note, '8n')
    }, when || 0)
  }

  // 畫面更新
  const render = (ctx, canvasW, canvasH) => {
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0, 0, canvasW, canvasH)
    for (let x = 0; x < game.value.gameWidth; x++) {
      for (let y = 0; y < game.value.gameWidth; y++) {
        drawBlock(ctx, new Vector(x, y), 'rgba(255,255,255,0.03)')
      }
    }
    snake.value.body.forEach(sp => {
      drawBlock(ctx, sp, '#fff')
    })
    game.value.foods.forEach(p => {
      drawBlock(ctx, p, 'red')
    })
    requestAnimationFrame(() => render(ctx, canvasW, canvasH))
  }

  const update = (ctx) => {
    if (game.value.start) {
      playSound('A2', -50)
      snakeUpdate()
      // 蛇吃到食物
      game.value.foods.forEach((food, i) => {
        if (snake.value.head.equal(food)) {
          snake.value.maxLength++
          game.value.foods.splice(i, 1)
          generateFood(ctx)
        }
      })
      // 蛇撞到身體
      snake.value.body.forEach(bp => {
        if (snake.value.head.equal(bp)) [
          endGame()
        ]
      })
      // 蛇碰到邊界
      if (!checkBoundary()) endGame()
    }


    setTimeout(() => {
      update(ctx)
    }, 150)
  }
  return {
    setDirection,
    score,
    game,
    startGame,
    render,
    update,
    generateFood
  }
}