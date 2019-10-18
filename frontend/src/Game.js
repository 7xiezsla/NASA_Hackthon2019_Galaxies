import React from 'react'
import Render from './Render'
import Global from './Global'

class Game extends React.Component{

  constructor(props){
    super(props)
    
    this.canvasRef = React.createRef()
    this.gaming = this.gaming.bind(this)
  }

  gaming(){
    // running()
    Render.drawBackgound(this.ctx)
    requestAnimationFrame(this.gaming)
  }

  componentDidMount(){
    const canvas = this.canvasRef.current
    this.ctx = canvas.getContext('2d')
    this.gaming()
  }

  render(){
    return <div>
      <canvas ref={this.canvasRef} height={Global.h} width={Global.w} style={{
        padding:0,
        mergin:0
      }}>
      </canvas>
    </div>
  }
}

export default Game