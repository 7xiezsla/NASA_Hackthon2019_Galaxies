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

  rankRenderHelper(){
    let data = []

    data.push({
      name: Global.user.name,
      photo: Global.user.photo,
      score: Global.user.score,
      hero:true
    })

    for(let i in Global.user.friends){
      data.push(Global.user.friends[i])
    }

    data.sort((a,b)=>{
      return b.score - a.score
    })
    
    return data.map((f, index)=>{

      let style = {
        padding:'10px'
      }

      if(f.hero){
        style.backgroundColor= '#cccccc'
      }

      return(
      <Row key={f.name} style={style}>
        <Col xs={1}>{index+1}</Col>                  
        <Col xs={3}><img style={{width:'9vh', position:'relative', top:'-20%'}} src={f.photo} /></Col>
        <Col xs={5}>{f.name}</Col>
        <Col xs={2}>{f.score}</Col>
      </Row>
      
    )})
  }
  render(){
    return (
      <Modal show={this.state.show} onHide={ () => this.props.actions('showFriendRank', false) } animation={false}>
        <Modal.Header >
          <Modal.Title>好友排行榜</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            {this.rankRenderHelper()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{this.props.actions('showFriendRank', false)}}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default FriendRank