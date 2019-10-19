import React from 'react';
import Game from './Game'
import Login from './components/Login'
import Register from './components/Register'
import Camera from 'react-html5-camera-photo'
import Map from './components/Map/Map'
import Util from './Util'
import Global from './Global'
import Reward from './components/Reward'
import GarbageResult from './components/GarbageResult'
import FriendRank from './components/FriendRank'
import Collection from './components/Collection'
import Api from './Api'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-html5-camera-photo/build/css/index.css'


class App extends React.Component{

  constructor(props){
    window.util = Util
    window.apii = Api
    super(props)
    this.handleModal = this.handleModal.bind(this)

    window.handler = this.handleModal

    this.state ={
      showLogin: false,
      showRegister: false,
      showCamera: false,
      showGame: false,
      showMap: true,
      showReward: false,
      showGarbageResult: false,
      showFriendRank: false,
      showCollection: false,
      rewardPic: null,
      garbagePic: null,
      fetchGarbage: false,
      landmarkName: ''
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

          while(Global.user.rewards.includes(n)){
            n = Math.floor(Math.random() * 8 )
          }

          Global.user.rewards.push(n)
          Global.user.score += 10
          landmark.achieve = true

          this.setState({
            showReward: true,
            rewardPic: Global.rewards[n],
            landmarkName: landmark.name
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
    let obj = {}
    obj[key] = value
    this.setState(obj)
  }

  render(){
    return(
      <div>
        <Login show={this.state.showLogin} actions={this.handleModal}/>
        <Register show={this.state.showRegister} actions={this.handleModal}/>
        <Reward show={this.state.showReward} actions={this.handleModal} pic={this.state.rewardPic} name={this.state.landmarkName}/>
        <GarbageResult show={this.state.showGarbageResult} actions={this.handleModal} pic={this.state.garbagePic} fetchGarbage={this.state.fetchGarbage}/>
        <FriendRank show={this.state.showFriendRank} actions={this.handleModal} />
        <Collection show={this.state.showCollection} actions={this.handleModal} />

        {this.state.showCamera ? 
          <Camera 
            onTakePhoto = {async (data)=>{
              Global.snapshot = data
              let detectResult = await Util.hasPerson(data)
              console.log(detectResult, detectResult)
              this.handleModal('showMap', true)
              this.handleModal('showCamera', false)
              this.handleModal('showGarbageResult', true)

              let fetchGarbage = false
              
              if(true){
                fetchGarbage = true
                Global.user.garbageTags.push({
                  lat:Global.pos.latitude,
                  lng:Global.pos.longitude
                })
              }

              this.setState({
                garbagePic: Global.snapshot,
                fetchGarbage
              })
            }}
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
            <Map actions={this.handleModal}/>
          :
          null
        }
      </div>
    )
  }
}


export default App;
