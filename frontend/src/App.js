import React from 'react';
import Game from './Game'
import Login from './components/Login'
import Register from './components/Register'
import Camera from 'react-html5-camera-photo'
import Map from './components/Map'
import Util from './Util'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-html5-camera-photo/build/css/index.css'

class App extends React.Component{

  constructor(props){
    window.util = Util
    super(props)
    this.openLoginModal = this.openLoginModal.bind(this)
    this.openRegisterModal = this.openRegisterModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)

    this.actions = {
      openLoginModal: this.openLoginModal,
      openRegisterModal: this.openRegisterModal,
      closeLoginModal: this.closeLoginModal,
      closeRegisterModal: this.closeRegisterModal
    }

    this.state ={
      showLogin: false,
      showRegister: false,
      showCamera: false,
      showGame: false,
      showMap: true
    }
  }

  openLoginModal(){
    this.setState({showLogin: true})
  }

  openRegisterModal(){
    this.setState({showRegister: true})
  }

  closeLoginModal(){
    this.setState({showLogin: false})
  }

  closeRegisterModal(){
    this.setState({showRegister: false})
  }
  

  render(){
    return(
      <div>
        <Login show={this.state.showLogin} actions={this.actions}/>
        <Register show={this.state.showRegister} actions={this.actions}/>
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
