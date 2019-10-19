import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class GarbageResult extends React.Component{
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

  render(){
    return (
      <Modal show={this.state.show} onHide={() => this.props.actions('showReward', false)} animation={false}>
        <Modal.Header>
          <Modal.Title>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{align:'center'}}
        >
          <h4>{
            this.props.fetchGarbage ? 
            "幹得好，世界因為你變得更美好" : "你與垃圾桶要一起入鏡哦"
            }
          </h4>
          <img 
            src={this.props.pic} 
            style={{
              width:'100%'
            }}
          />
          <br /><br />
          <h5>{
            this.props.fetchGarbage ? 
            "成功改善環境得到十分" : "改變世界，從我們做起，再接再厲！"
          }
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={() => this.props.actions('showGarbageResult', false)}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default GarbageResult