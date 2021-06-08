import React, { Component } from 'react'
import { connect } from 'react-redux'
import {toast} from "react-toastify"
import {Plus} from "react-feather"
import img from "../../assets/img/poker/banner_2_en.jpg"
import { roomOpen , buyInModalOpen , setPosition } from "../../redux/actions/poker";
export class PokerPane extends Component {

  state = {
    thisRoom : {},
    players : []
  }

  componentDidUpdate(){
    if((this.state.thisRoom !== this.props.selectRooms) && this.props.selectRooms._id){
      this.updateRoom();
    }
  }
  
  updateRoom(){
    var room = this.props.selectRooms;
    var players = room.players;

    var myposition = 0;
    var myindex = players.findIndex(item => item.playerId === this.props.user.token);
    if(myindex > -1){
      myposition = room.players[myindex].position;
    }

    var newPlayers = [];
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
    this.setState({thisRoom : this.props.selectRooms , players : newPlayers});
  }

  open(){
    for(var i = 0 ; i < this.props.headerData.data.length ; i ++){
      var room = this.props.headerData.data[i].players;
      var index = room.findIndex(item => item.playerId === this.props.user.token);
      if(index > -1){
        if(this.props.headerData.data[i]._id === this.props.selectRooms._id){
          toast.error("Now you are already playing on this room.");
        }else{
          toast.error("Now you are playing other room.");
        }
        return;
      }
    }
    if(this.props.selectRooms){
      var sendData = {
        roomId : this.props.selectRooms._id,
      }
      this.props.roomOpen(sendData);
    }else{
      toast.warn("please select room")
    }
  }

  roomOpen(position){
    this.open();
    this.props.buyInModalOpen(true);
    this.props.setPosition(position);
  }

  render() {
    return (
      <>
        <div className="title-container-g-h">
            <h2>{this.state.thisRoom.roomName}</h2>
            <p>{this.state.thisRoom.roomType}</p>
        </div>
        <div className="lobby-right-c">
            <div className="right-b-column">
                <div className="right-b-p">
                    <div className="right-b-info-box">
                        <div className="single-game-info-p">
                            <div className="single-game-column-p">
                                <div className="table-details-component-mini">
                                    <div className="p-table-mini">
                                        <div className="table-info-view-contain-p">
                                            <div className="table-info-view-p">
                                                <p>Buy-In Range</p>
                                                <span> { this.props.user.currency + " " + this.state.thisRoom.minbuyin + " ~  "+ this.props.user.currency + " " + this.state.thisRoom.maxbuyin} </span>
                                            </div>
                                        </div>
                                        <div className="t-seat-count-container ">
                                            {this.state.players.map((item , key) => (
                                              <React.Fragment key = {key}>
                                                {item.noPlayer ? 
                                                  <div className="single-t-seat-view" onClick = {() => this.roomOpen(key)}>
                                                    <div className="add-circle-v">
                                                      <Plus />
                                                    </div>
                                                  </div>
                                                   :
                                                   <div className="single-t-seat-view ">
                                                    <div className="gamer-view-p ">
                                                      <div className="user-info-box-p">
                                                        <div className="gamer-info-view-p">
                                                          <p>{item.playerName}</p>
                                                          <span>{ this.props.user.currency + " " + item.chips}</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                }
                                              </React.Fragment>                                              
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="join-open-buttons-view-p">
                                    <div className="button-container-p ">
                                        <button className="button-p-view" onClick ={() => this.open()}> Join Waiting List </button>
                                    </div>
                                    <div className="button-container-p trans-view-b">
                                        <button className="button-p-view trans-view-b" onClick ={() => this.open()}> Open </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="banner-container-p">
                                <a className="active " href="https://igamez.ai" target="_blank" rel="noopener noreferrer" >
                                    <img alt="" src={img} />
                                </a>
                                <div className="banner-slider-control">
                                    <span className="active "></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.auth.user,
  selectRooms : state.poker.selectRooms,
  currentRoom : state.poker.currentRoom,
  allRooms : state.poker.allRooms,
  headerData : state.poker.headerData,
})

const mapDispatchToProps = {
  roomOpen,
  buyInModalOpen ,
  setPosition,
}

export default connect(mapStateToProps, mapDispatchToProps)(PokerPane)