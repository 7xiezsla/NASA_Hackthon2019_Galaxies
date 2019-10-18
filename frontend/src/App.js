import React from 'react';
import Game from './Game'
import Login from './components/Login'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{

  constructor(props){
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
      showLogin: true,
      showRegister: false
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
        <Game />
      </div>
    )
  }
}


export default App;
