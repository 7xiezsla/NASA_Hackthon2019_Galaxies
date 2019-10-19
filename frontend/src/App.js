import React from 'react';
import Game from './Game'
import Login from './components/Login'
import Register from './components/Register'
import Camera from 'react-html5-camera-photo'
import Map from './components/Map/Map'
import Util from './Util'
import Global from './Global'
import Reward from './components/Reward'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-html5-camera-photo/build/css/index.css'


class App extends React.Component{

  constructor(props){
    window.util = Util
    super(props)
    this.handleModal = this.handleModal.bind(this)

    window.handler = this.handleModal

    this.state ={
      showLogin: false,
      showRegister: false,
      showCamera: false,
      showGame: false,
      showMap: false,
      showReward: false,
      rewardPic: null
    }

    this.interval = setInterval( ()=>{
      Util.getUserPostion().then((pos)=>{
        Global.pos = pos
      })
    }, 1000)

    this.detectInnerMarkland = setInterval( ()=>{
      // console.log('detect')
      if(this.state.showMap === false || this.state.showReward) return

      for(let i in Global.landmarks){
        let landmark = Global.landmarks[i]

        let distance = this.calDistance(Global.pos, landmark)
        // console.log(distance)
        if(distance < 1e-8 && landmark.achieve !== true){
          
          let n = Math.floor(Math.random() * 8 )

          while(Global.userReward.has(n)){
            n = Math.floor(Math.random() * 8 )
          }

          landmark.achieve = true
          this.setState({
            showReward: true,
            rewardPic: Global.rewards[n]
          })

          break;
        }
      }

    }, 1000)
  }

  calDistance = (user, landmark) =>{
    return Math.sqrt(
      Math.pow(user.latitude - landmark.lat, 2) +
      Math.pow(user.longitude - landmark.lng, 2)
    )
  }
  
  handleModal(key, value){
    console.log(key, value)
    let obj = {}
    obj[key] = value
    console.log(obj)
    this.setState(obj)
  }

  render(){
    return(
      <div>
        <Login show={this.state.showLogin} actions={this.handleModal}/>
        <Register show={this.state.showRegister} actions={this.handleModal}/>
        <Reward show={this.state.showReward} actions={this.handleModal} pic={this.state.rewardPic}/>

        {this.state.showCamera ? 
          <Camera 
            onTakePhoto = {(data)=>{console.log(data)}}
            isFullscreen= {true}
          />
        : 
          null
        }
        {
          this.state.showGame ?
            <Game />
          :
          null
        }

        {
          this.state.showMap ?
            <Map />
          :
          null
        }
      </div>
    )
  }
}


export default App;
