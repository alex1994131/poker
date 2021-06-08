import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal , ModalHeader , ModalBody , Row , Col , Button} from "reactstrap"
import { exitModalChange , exitRoom , closeGame} from "../../../redux/actions/poker";

export class pokerheader extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async exit(){
    var sendData = {
      roomId : this.props.currentRoom._id
    }
    await this.props.exitRoom(sendData);
    this.props.exitModalChange(false);
    if(this.props.exitGame){
      this.props.closeGame();
    }
  }

  render(){
    return (
      <Modal isOpen={this.props.exitModalflag} className="modal-dialog-centered modal-sm poker-buyin">
        <div className="poker-buyin-form">
          <ModalHeader toggle={() => this.props.exitModalChange(false , false)} className="poker-buyin-header"> {"Exit Table"} </ModalHeader>
          <ModalBody className="mt-1">
            <Row>
              <Col className = "pl-2 pr-2">
                <h5>{ "You really want to exit this room ?" }</h5>
                <h6>{ "If so you will exit after this round. " }</h6>
              </Col>
              <Col sm="12" className = "mt-1">
                <Row>
                  <Col sm="6">
                    <Button className = "poker-buyin-button" onClick = {() => this.exit()} >{"Yes"}</Button>
                  </Col>
                  <Col sm="6">
                    <Button className = "poker-buyin-button" onClick = {() => this.props.exitModalChange(false)}> {"No"} </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exitModalflag : state.poker.exitModal,
    currentRoom : state.poker.currentRoom,
    user : state.auth.user,
    exitGame : state.poker.exitGame
  }
}

const mapDispatchToProps = {
  exitModalChange,
  exitRoom,
  closeGame
}

export default connect(mapStateToProps, mapDispatchToProps)(pokerheader)