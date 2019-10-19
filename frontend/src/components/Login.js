import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false,
      account: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({
        show:nextProps.show
      })
    }
  }

  handleChange(e){
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  render(){
    return (
      <Modal show={this.state.show} onHide={()=> this.props.actions('showLogin', false)} animation={false}
        // style={{position:'absolute',top:'15%'}}
      >
        <Modal.Header>
          <Modal.Title>Loging ... </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="account">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" placeholder="Enter email" 
              onChange={this.handleChange} value={this.state.account}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" placeholder="Password" 
              onChange={this.handleChange} value={this.state.password}
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={()=>{
              this.props.actions('showLogin', false)
              this.props.actions('showRegister', true)
            }}>
            Register
          </Button>
          <Button variant="primary" onClick={()=>{
            this.props.actions('showLogin', false)
            this.props.actions('showGame', true)
          }}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Login