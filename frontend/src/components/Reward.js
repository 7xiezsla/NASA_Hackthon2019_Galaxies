import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Reward extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false,
    }
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
      <Modal show={this.state.show} onHide={() => this.props.actions('showReward', false)} animation={false}
        // style={{position:'absolute',top:'15%'}}
      >
        <Modal.Header>
          <Modal.Title>Reward ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img 
            src={this.props.pic} 
            style={{
              width:'100%'
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={() => this.props.actions('showReward', false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Reward