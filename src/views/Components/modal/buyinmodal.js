import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal , ModalHeader , ModalBody , Row , Col , Input , FormGroup , Label , Button} from "reactstrap"
import { buyInModalOpen , roomJoin } from "../../../redux/actions/poker";
import BuyInModalError from "./buyinmodalerror";

export class pokerheader extends Component {
  _isMounted = false;
  timer = null;
  constructor(props) {
    super(props)
    this.state = {
      buyInMoney : 0,
      showSlider : 5,
      showSliderTime : 15
    }
  }

  componentDidMount() {
    this.setState({buyInMoney : this.props.currentRoom.maxbuyin});
    this._isMounted = true;
    this.timer = setInterval(this.update, 1000)
  }
  update = () => {
    if (this._isMounted) {
      this.setState({showSlider : this.state.showSlider - 1 , showSliderTime : this.state.showSliderTime - 1});
      if(!this.state.showSliderTime){
        clearInterval(this.timer);
      }
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  buyIn(){
    if(this.props.user.balance < this.props.currentRoom.minbuyin){
      return;
    }
    if(this.state.buyInMoney < this.props.currentRoom.minbuyin || this.state.buyInMoney > this.props.currentRoom.maxbuyin){
      return;
    }
    var sendData = {
      roomId : this.props.currentRoom._id,
      buyIn : this.state.buyInMoney,
      position : this.props.position,
    }
    this.props.roomJoin(sendData);
    this.props.buyInModalOpen(false);
  }

  render() {
    var currentRoom = this.props.currentRoom;
    return (
      <Modal isOpen={this.props.buyInModal} className="modal-dialog-centered modal-sm poker-buyin">
        <div className="poker-buyin-form">
          <ModalHeader toggle={() => this.props.buyInModalOpen(false)} className="poker-buyin-header"> {"Buy-In"} </ModalHeader>
          {/* {
            this.state.showSlider <= 0 && this.state.showSliderTime > 0 ? 
            <React.Fragment>
              <div className = { "poker-buyin-slider " + (this.state.showSliderTime <= 10 ? "slider-active" : "") }>
                {"You have " + this.state.showSliderTime + " second to make buy-in."}
              </div> 
              : ""
            </React.Fragment> : null
           } */}
          <ModalBody className="mt-1">
            <Row>
              <Col className = "pl-2 pr-2">
                <div className = "navHeader">
                  <p className = "navHeader-p">{ currentRoom.roomName }</p>
                  <p> { currentRoom.smallblind  + " " + this.props.user.currency + " / " + currentRoom.bigblind + " " + this.props.user.currency + " " + currentRoom.roomType} </p>
                </div>
                <Row className = "mt-2" >
                  <Col sm="6">
                    <FormGroup>
                      <Label className = "poker-buyin-label"> {"AVAILABLE BALANCE"} </Label>
                      <Input type="text" name="username" id="username" value = { this.props.user.balance + " " + this.props.user.currency} readOnly />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label className = "poker-buyin-label"> {"BUY-IN AMOUNT"} </Label>
                      <Input type="number" name="amount" id="amount" onChange = {(e) => this.setState({buyInMoney : e.target.value})} value = {this.state.buyInMoney} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <a href = "/"> {"Make a deposit"} </a>
                  </Col>
                  <Col sm="6">
                    <Row>
                      <Col sm="6">
                        <p className = "poker-buyin-money-btn" onClick = {() => this.setState({buyInMoney : currentRoom.minbuyin})}>{"Min"}</p>
                        <p className = "textAlignCenter"> {this.props.user.currency + " " + currentRoom.minbuyin} </p>
                      </Col>
                      <Col sm="6">
                        <p className = "poker-buyin-money-btn" onClick = {() => this.setState({buyInMoney : currentRoom.maxbuyin})}>{"Max"}</p>
                        <p className = "textAlignCenter"> {" " + this.props.user.currency + " " + currentRoom.maxbuyin} </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className = "poker-buyin-error">
                  { 
                    this.props.user.balance < currentRoom.minbuyin ? 
                    <BuyInModalError 
                      error = {"Invalid Buy-In amount"} 
                      errormsg = {"You can not buy-in as you do not have enough funds.In order to buy-in, please deposit."}>
                    </BuyInModalError>
                     : (
                        this.state.buyInMoney < currentRoom.minbuyin || this.state.buyInMoney > currentRoom.maxbuyin ? 
                        <BuyInModalError 
                          error = {"Invalid Buy-In amount"} 
                          errormsg = {"You can not buy-in as you input incorrect value.In order to buy-in, please change value."}>
                        </BuyInModalError> : ""
                     )
                  }
                </div>
              </Col>
              <Col sm="12" className = "mt-1">
                <Row>
                  <Col sm="6">
                    <Button className = "poker-buyin-button" onClick = {() => this.buyIn()} >{"Buy-In"}</Button>
                  </Col>
                  <Col sm="6">
                    <Button className = "poker-buyin-button" onClick = {() => this.props.buyInModalOpen(false)}> {"Cancel"} </Button>
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
    currentRoom : state.poker.currentRoom,
    buyInModal : state.poker.buyInModal,
    user : state.auth.user,
    position: state.poker.position
  }
}

const mapDispatchToProps = {
  buyInModalOpen,roomJoin
}

export default connect(mapStateToProps, mapDispatchToProps)(pokerheader)