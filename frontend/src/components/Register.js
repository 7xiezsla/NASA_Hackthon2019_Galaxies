import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false,
      account: '',
      password: '',
      confirmPassword: '',
      name: '',
      age: 0,
      sex: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
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

  handleRadioChange(e){

    this.setState({
      sex: e.target.id
    })
  }

  render(){
    return (
      <Modal show={this.state.show} onHide={ () => this.props.actions('showRegister', false) } animation={false}
        // style={{position:'absolute',top:'15%'}}
      >
        <Modal.Header>
          <Modal.Title>Register ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="account" >
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" placeholder="Enter email" 
              onChange={this.handleChange} value={this.state.account}
            />
          </Form.Group>

          <Form.Group controlId="password" >
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" placeholder="Password" 
              onChange={this.handleChange} value={this.state.password}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" placeholder="Password Again" 
              onChange={this.handleChange} value={this.state.confirmPassword} 
            />
          </Form.Group>

          <Form.Group controlId="name" >
            <Form.Label>User Name</Form.Label>
            <Form.Control 
              type="text" placeholder="User Name" 
              onChange={this.handleChange} value={this.state.name} 
            />
          </Form.Group>
          
          <Form.Group controlId="age" >
            <Form.Label>Age</Form.Label>
            <Form.Control 
              type="number" placeholder="Age" 
              onChange={this.handleChange} value={this.state.age}
            />
          </Form.Group>

          <Form.Group controlId="sex" onChange={this.handleRadioChange}>
            <Form.Label>Gender</Form.Label>
            <Col sm={10}>
              <Form.Check onChange={this.handleChange}
                type="radio"
                label="female"
                name="formHorizontalRadios"
                id="female"
              />
              <Form.Check 
                type="radio"
                label="male"
                name="formHorizontalRadios"
                id="male"
              />
            </Col>
          </Form.Group>

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