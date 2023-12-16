import Vector from './useVector'
import { ref } from 'vue'

export function useSnakeGame(){

  const snake = ref({
    body: [],
    maxLength: 5,
    head: new Vector(),
    speed: new Vector(1,0),
    direction: 'Right'
  })
  const snakeUpdate = ()=>{
    let newHead = snake.value.head.add(snake.value.speed)
    snake.value.body.push(snake.value.head)
    snake.value.head = newHead
    while(snake.value.body.length > snake.value.maxLength){
      snake.value.body.shift()
    }
  }
  const setDirection = (dir)=>{
    // console.log(dir);
    let target
    switch(dir){
      case 'Up':
        target = new Vector(0,-1)
        break;
      case 'Down':
        target = new Vector(0,1)
        break;
      case 'Left':
        target = new Vector(-1,0)
        break;
      case 'Right':
        target = new Vector(1,0)
        break;
    }
    if(target.equal(snake.value.speed.mul(-1))==false){
      snake.value.speed = target
    }
  }

  const game = ref({
    blockWidth: 12, //小格子寬度
    blockGap:2, //格子間寬度
    gameWidth: 40, // 遊戲邊長有幾個格子
    speed: 30,
    // snake: snake.value,
    food: []
  })
  const getPosition = (x,y)=>{
    return new Vector
    (x*game.value.blockWidth + (x-1)*game.value.blockGap,
    y*game.value.blockWidth + (y-1)*game.value.blockGap)
  }

  const drawBlock = (ctx,v,color)=>{
    ctx.fillStyle = color
    let pos = getPosition(v.x,v.y)
    ctx.fillRect(pos.x,pos.y,game.value.blockWidth,game.value.blockWidth)
  }

  const render = (ctx,canvasW,canvasH)=>{
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0,0,canvasW,canvasH)
    for(let x=0;x<game.value.gameWidth;x++){
      for(let y=0;y<game.value.gameWidth;y++){
        drawBlock(ctx,new Vector(x,y),'rgba(255,255,255,0.03)')
      }
    }
    snake.value.body.forEach(sp=>{
      drawBlock(ctx,sp,'#fff')
    })
    requestAnimationFrame(()=>render(ctx,canvasW,canvasH))
  }

  const update = ()=>{
    snakeUpdate()
    setTimeout(()=>{
      update()
    },150)
  }
  return{
    setDirection,
    game,
    render,
    update
  }
}