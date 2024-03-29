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
      <Modal show={this.state.show} onHide={() => this.props.actions('showReward', false)} animation={false}>
        <Modal.Header>
          <Modal.Title>獎勵</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{align:'center'}}
        >
          <h4>{`探索${this.props.name}`}</h4>
          <img 
            src={this.props.pic} 
            style={{
              width:'100%'
            }}
          />
          <br /><br />
          <h5>成功得到十分，與太空宇宙圖一張</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={() => this.props.actions('showReward', false)}>
            接收
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Reward