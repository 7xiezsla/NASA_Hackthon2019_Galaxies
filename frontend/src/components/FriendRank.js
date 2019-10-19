import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Global from '../Global'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class FriendRank extends React.Component{
  constructor(props){
    super(props)
 
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({
        show:nextProps.show
      })
    }
  }

  render(){
    return (
      <Modal show={this.state.show} onHide={ () => this.props.actions('showRegister', false) } animation={false}>
        <Modal.Header >
          <Modal.Title>好友排行榜</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            Global.user.friends.map((f)=>{
              return (

              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={()=>{
              this.props.actions('showRegister', false)
              this.props.actions('showLogin', true)
          }}>
            Login
          </Button>
          <Button variant="primary" onClick={()=>{}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Register