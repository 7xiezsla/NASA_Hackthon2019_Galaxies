import Global from '../Global'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react'
import Container from 'react-bootstrap/Container'

class Collection extends React.Component{

  constructor(props){
    super(props)
    this.state={
      show:false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({
        show:nextProps.show
      })
    }
  }

  collectionRenderHelper(){
    let pictures = Global.user.rewards

    let result = []

    const style={
      width:'120%'
    }
    for(let i = 0; i <= pictures.length/3; i++){
      let index = i * 3
      result.push(
        <React.Fragment key={i}>
        <Row >
          
          {index < pictures.length ? <Col xs={4} ><img src={Global.rewards[pictures[index]]} style={style}/></Col> : null}
          {index +1 < pictures.length ? <Col xs={4} ><img src={Global.rewards[pictures[index +1]]} style={style}/></Col> : null}
          {index +2 < pictures.length ? <Col xs={4} ><img src={Global.rewards[pictures[index +2]]} style={style}/></Col> : null}
          
        </Row>
        <br />
        </React.Fragment>
      )

    }

    return result.map((p, index)=>{
      return p
    })

  }

  collectionRenderHelper2(){

    let pictures = Global.user.rewards

    let style = {
      width:'100%'
    }

    return pictures.map((p, index)=>{
      return (
        <React.Fragment key={index}>
          <Row>
            <Col xs={12}><img src={Global.rewards[p]} style={{width:'280px'}}/></Col>
          </Row>
          <br />
        </React.Fragment>
      )
    })
  }
  render(){
    return (
      <Modal show={this.state.show} onHide={ () => this.props.actions('showCollection', false) } animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>收藏</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            {this.collectionRenderHelper2()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{this.props.actions('showCollection', false)}}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default Collection