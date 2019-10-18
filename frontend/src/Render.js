import Global from './Global'

class Render{
  static drawBackgound(ctx){
    ctx.fillStyle='#333333'
    ctx.fillRect(0, 0, Global.w, Global.h)
  }
}

export default Render