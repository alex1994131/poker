import React from "react"
import { connect } from "react-redux";
import { Row , Col , Input } from "reactstrap"
import { Root } from "../../authServices/rootconfig"
import { userCall , userFold , userAllIn , userBet , userCheck , fetchMyRoomData , activeLobby , buyInModalOpen , setPosition , sendMessage} from "../../redux/actions/poker/index"
import { Plus , Send } from "react-feather"
import { AwesomeButton } from 'react-awesome-button';
import pokerConfig from "../../configs/pokerConfig";
import BuyIn from "../Components/modal/buyinmodal";
import Slider from 'rc-slider';
import {toast} from "react-toastify";
import 'rc-slider/assets/index.css';
import "react-awesome-button/src/styles/styles.scss";

class Poker extends React.Component {

  timer = null;
  state = {
    thisRoom : {},
    me : {},
    newPlayers : [],
    showSlider : true,
    isCall : false,
    isAllin : false,
    betMoney : 0,
    minMoney : 0,
    maxMoney : 0,
    callMoney : 0,
    myindex : -1,
    message : "",
    footer : pokerConfig.footer[0],
    intervalTime : 0,
  }

  async componentDidMount(){
    await this.updateRoom();
    if(this.props.currentRoom._id){
      Root.socket.emit("room_join" , {roomId : this.props.currentRoom._id})
    }
  }

  componentDidUpdate(){
    if(this.state.thisRoom !== this.props.currentRoom){
      this.updateRoom();
    }
  }

  updateRoom(){
    const room = this.props.currentRoom;
    if(!room._id){
      this.props.activeLobby()
    }else{
      var myindex = room.players.findIndex(item => item.playerId === this.props.user.token);
      var players = room.players;
      var newPlayers = [];
      var myposition = 0;

      if(myindex > -1){
        myposition = room.players[myindex].position;
      }

      for(var i = 0 ; i < room.maxplayers; i ++){
        var position = i + myposition;
        if(position >= room.maxplayers){
          position -= room.maxplayers;
        }
        // eslint-disable-next-line
        var index = room.players.findIndex(item => item.position === position);
        if(index > -1){
          newPlayers.push(players[index]);
        }else{
          newPlayers.push({noPlayer : true});
        }
      }

      if(this.state.thisRoom !== room && myindex > -1 && room.players[myindex].currentplayer){
        var maxpotIndex = room.players.findIndex(item => item.pot > room.players[myindex].pot);
        var isCall = false , isAllin = false , showSlider = false;
        var callMoney = 0 , betMoney = 0 , lastActionamount = room.bigblind;
        var intervalTime = (new Date(room.lastActionTime).valueOf() + room.timeout - new Date().valueOf()) / 1000;

        if(maxpotIndex > -1){
          isCall = true;
          callMoney = room.players[maxpotIndex].pot - room.players[myindex].pot;
          betMoney = callMoney * 2 + room.players[myindex].pot;
          if(callMoney >= room.players[myindex].chips) {isAllin = true;}
        }else{
          betMoney = lastActionamount;
        }

        if(room.players[myindex].chips <= lastActionamount) {isAllin = true;}
        if(room.roomType === pokerConfig.roomType[1].name || room.roomType === pokerConfig.roomType[3].name){ showSlider = true; }

        this.setState({
          showSlider,
          isCall,
          isAllin,
          myindex,
          callMoney,
          betMoney,
          newPlayers,
          intervalTime,
          thisRoom : room,
          me : room.players[myindex],
          minMoney: callMoney,
          maxMoney : room.players[myindex].chips,
        });

        if(room.players[myindex].currentplayer){
          this.calcTime(room);
        }
      }else{
        this.setState({thisRoom : room , me : room.players[myindex] , newPlayers , myindex});
      }
    }
  }

  changeBetMoney(value){
    var isAllin = false;
    if(value === this.state.me.chips){
      isAllin = true;
    }
    this.setState({betMoney : value , isAllin});
  }

  userAction(action , money = false){
    var sendData = { roomId : this.state.thisRoom._id }
    if(money){
      sendData.amount = this.state.betMoney;
    }
    clearInterval(this.timer);
    this.setState({intervalTime : 0});
    switch(action){
      case "fold" : 
        this.props.userFold(sendData);break;
      case "call" : 
        this.props.userCall(sendData);break;
      case "allin" : 
        this.props.userAllIn(sendData);break;
      case "bet" : 
        this.props.userBet(sendData);break;
      case "check" : 
        this.props.userCheck(sendData);break;
      default :
        break;
    }
  }

  openBuyIn(position){
    this.props.buyInModalOpen(true);
    this.props.setPosition(position);
  }
  
  sendMessage(key , event = {}){
    if((key || event.key === "Enter") && this.state.myindex > -1){
      var sendData = { message : this.state.message , roomId : this.state.thisRoom._id }
      this.props.sendMessage(sendData);
      this.setState({message : ""});
    }
  }

  footerChange(item){
    // if(item === pokerConfig.footer[1]){
    //   await this.props.getRoomHistory(this.state.thisRoom._id);    
    // }
    this.setState({footer : item});
  }

  calcTime(){
    this.timer = setInterval(() => {
      this.setState({intervalTime : this.state.intervalTime - 1});
      if(this.state.intervalTime <= 0){
        console.log(this.state.thisRoom , !this.state.thisRoom)
        if(this.state.isCall){
          toast.success("fold")
          this.userAction("fold")
        }else{
          toast.success("check")
          this.userAction("check")
        }
      }
    }, 1000);
  }

  render(){
    return(
      <>
        <Row className = "pokerRoom">
          <Col xs="9" className = "poker-room-letter p-2 pl-3">
            <h4>{"Current Room Id : " + (this.state.thisRoom ? this.state.thisRoom._id : "")}</h4>
            <a className = "a_show_previous" href = "/">
              {"Show hand history " + this.state.intervalTime}
            </a>
          </Col>
          <Col xs="12" className = "textAlignC">
            <img src = {pokerConfig.pane} className = "pane_image" alt =""></img>
            <div className = "allpot">
              <p>{"All POT : " + (this.state.thisRoom.allPot ? this.state.thisRoom.allPot : 0) + " " + this.props.user.currency}</p>
            </div>
            {this.state.thisRoom.board ? this.state.thisRoom.board.map((item , i) => (
              <img key={i} src = {pokerConfig.Cards[item]} alt = "" className = {"board" + (i+1)}></img>
            )) : ""}
            {this.state.newPlayers.map((item , i) => (
              <React.Fragment key = {i} >
                {!item.noPlayer ? 
                  <div className = {"position-absolute user-" + this.state.thisRoom.maxplayers + "-" + i}>
                    <img src = {pokerConfig.avatar['avatar']} alt = "" className = {item.currentplayer && this.state.thisRoom.roundname !== "Showdown" ? "user_avatar c-player" : "user_avatar"}></img>
                    {item.dealer ? 
                      <div className = "dealer"><span>D</span></div> : ""
                    }
                    <div>
                      {
                        item.cards.length ? (
                          item.cards.length === 2 ? item.cards.map((card , key) => (
                            <img key={key} src = {(this.props.user.token !== item.playerId ? 
                              (this.state.thisRoom.roundname === "Showdown" ? pokerConfig.Cards[card] : pokerConfig.back)
                              : 
                              pokerConfig.Cards[card])} alt = "" className = {"card" + (key + 1)}></img>
                          ))
                          : 
                          item.cards.map((card , key) => (
                            <img key={key} src = {(this.props.user.token !== item.playerId ? 
                              (this.state.thisRoom.roundname === "Showdown" ? pokerConfig.Cards[card] : pokerConfig.back)
                                : 
                              pokerConfig.Cards[card])} alt = "" className = {"card" + key}></img>
                          ))
                        ) : ""
                      }
                    </div>
                    <div className = {item.currentplayer && this.state.thisRoom.roundname !== "Showdown" ? "user_info active" : "user_info"}>
                      <div style = { item.currentplayer && this.state.thisRoom.roundname !== "Showdown" ? {animationDuration: "30s"} : {}}></div>
                      <p className = "color_white m-0">{item.playerName}</p>
                      <p className = "color_white m-0">{ "chips : " + item.chips + " " + this.props.user.currency}</p>
                      <p className = "color_white">{ "pot : " + item.pot + " " + this.props.user.currency}</p>
                    </div>
                  </div> : (
                  this.state.myindex < 0 ? 
                    <div className = {"position-absolute user-" + this.state.thisRoom.maxplayers + "-" + i + "-add"} onClick = {() => this.openBuyIn(i)}>
                      <Plus size = "60"></Plus>
                    </div> : ""
                )}
              </React.Fragment>
            ))}
          </Col>
        </Row>
        <BuyIn />
        <div className = "poker-room-footer">
          <div>
            {pokerConfig.footer.map((item , i) => (
              <div key = {i} onClick = {() => this.footerChange(item)} className = {item.name === this.state.footer.name ? "poker-chat-header-item poker-chat-header-item-active" : "poker-chat-header-item"}>{item.name}</div>
            ))}
          </div>
          <Row className = "table-footer-v">
            {
              this.state.footer === pokerConfig.footer[0] ? 
                <div className = "poker-chat">
                  <div className = "poker-chat-letter">
                    {
                      this.props.messages.data.map((item , key) => (
                        <p key = {key} className = "poker-chat-letter-line"><span>{ item.playerId + " : "}</span> {item.message} </p>
                      ))
                    }
                  </div>
                  <div className = "poker-chat-input-header">
                    <Input value = {this.state.message} onChange = {(e) => this.setState({ message : e.target.value })} onKeyPress = {(e) => this.sendMessage(false , e)}></Input>
                    <button onClick = {() => this.sendMessage(true)}><Send></Send></button>
                  </div>
                </div>
                 : 
                <div className = "poker-chat">
                  {/* {console.log(this.props.roomHistory.data)}
                  <div className = "poker-chat-history">
                    <table>
                      <thead>
                        <th>Id</th>
                        <th>My Cards</th>
                        <th>Boards</th>
                        <th>Pot</th>
                      </thead>
                      <tbody>
                        {this.props.histroyData.data.map((item , i)=>(
                          <tr key = {i}>
                            <td>{item.roomId}</td>
                            <td>d</td>
                            <td>d</td>
                            <td>d</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
                </div>
              }
            <div className = "poker-action">
              {this.state.me && this.state.me.currentplayer && this.state.thisRoom.roundname !== "Showdown" ? 
                <div className = "poker-acction-board">
                  {this.state.showSlider ? 
                    <Slider className = "ml-1 pb-1 mt-2" min ={this.state.minMoney} max = {this.state.maxMoney} onChange = {(e) => this.changeBetMoney(e)} /> : ""
                  }
                  <AwesomeButton 
                    className = {this.state.showSlider ? "ml-1 wpx-100" : "ml-1 wpx-100 mt-2"} 
                    type="facebook" 
                    onPress = {() => this.userAction("fold")}
                  >Fold</AwesomeButton>
                  {this.state.isCall ? 
                    <>
                      {!this.state.isAllin ? 
                        <AwesomeButton 
                          className = {this.state.showSlider ? "ml-1" : "ml-1 mt-2"} 
                          type="primary" 
                          onPress = {() => this.userAction("call")}>{"Call " + this.props.user.currency + " " + this.state.callMoney}
                        </AwesomeButton> : ""
                      }
                    </>
                    : 
                    <AwesomeButton 
                      className =  {this.state.showSlider ? "ml-1 wpx-100" : "ml-1 wpx-100 mt-2"} 
                      type="facebook" 
                      onPress = {() => this.userAction("check")}>Check
                    </AwesomeButton>
                  }
                  {this.state.isAllin ? 
                    <AwesomeButton 
                      className = {this.state.showSlider ? "ml-1 wpx-100" : "ml-1 wpx-100 mt-2"} 
                      type="primary" 
                      onPress = {() => this.userAction("allin")}>All In
                    </AwesomeButton>
                    : 
                    <AwesomeButton 
                      className =  {this.state.showSlider ? "ml-1" : "ml-1 mt-2"} 
                      type="primary" 
                      onPress = {() => this.userAction("bet" , true)}>
                        { this.state.thisRoom.roomType === pokerConfig.roomType[1].name || this.state.thisRoom.roomType === pokerConfig.roomType[3].name ?
                        "Bet " + this.props.user.currency + " " + this.state.betMoney : "Raise " + this.props.user.currency + " " + this.state.betMoney}
                    </AwesomeButton>
                  }
                </div> : ""
              }
            </div>
          </Row>
        </div>
      </>
    )
  }
}

const loadStateData  = (state) =>{
  return {
    currentRoom : state.poker.currentRoom,
    user : state.auth.user,
    buyInMoney : state.poker.buyInMoney,
    messages : state.poker.messages,
    roomHistory : state.poker.histroyData
  }
}

const mapDispatchToProps = {
  userCall,
  userFold ,
  userAllIn ,
  userBet ,
  userCheck,
  fetchMyRoomData,
  activeLobby ,
  buyInModalOpen ,
  setPosition,
  sendMessage
}

export default connect(loadStateData,mapDispatchToProps)(Poker);