import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from "classnames"
import { X , Settings , Trello} from "react-feather"
import {activeTab , tabClose , activeLobby , exitModalChange , closeGame} from "../../../redux/actions/poker";
import ExitModal from "../modal/exitmodal";

export class PokerHeader extends Component {

  activeTab(e = {}){
    this.props.activeTab(e);
  }

  tabClose(e){
    var room = e;
    var user = this.props.user;
    var index = room.players.findIndex(item => item.playerId === user.token);
    if(index > -1){
      this.props.exitModalChange(true);
    }else{
      this.props.tabClose({ roomId : room._id});
    }
  }

  async closeGame(){
    var room = this.props.currentRoom;
    var user = this.props.user;
    var sendData = {
      roomId : this.props.currentRoom._id
    }
    if(room.players){
      var index = room.players.findIndex(item => item.playerId === user.token);
      if(index > -1){
        this.props.exitModalChange(true , true);
      }else{
        await this.props.exitRoom(sendData);
        this.props.closeGame();
      }
    }else{
      await this.props.exitRoom(sendData);
      this.props.closeGame();
    }
  }

  render() {
    var user = this.props.user;
    return (
      <div className="header-container-p">
        <div className="home-icon-wrapper ng-star-inserted"><b className="home-icon-view"></b></div>
          <div className="tab-nav-container-v ng-star-inserted">
            <ul>
              <li className={classnames( `ng-star-inserteds`, {"active" : this.props.isLobby})}
                  onClick={()=>this.props.activeLobby()}>
                <div className="single-tab-v-p active lobby">
                  <p>
                    <span>Lobby</span>
                  </p>
                  <span>
                    <i className="line-view-color-p"></i>
                  </span>
                </div>
              </li>
              {
                this.props.headerData.data.map((item, key)=>(
                  <li key={key} className={ classnames( `ng-star-inserted`, {"active" :!this.props.isLobby && this.props.currentRoom._id === item._id})}
                    onClick={()=>this.activeTab(item)}>
                    <div className="ng-star-inserted">
                      <div className="single-tab-v-p">
                        <p>
                          <span className="tab-info-view-p"> 
                            <i>{item.roomName}</i>
                          </span>
                        </p>
                        <ul>
                          <li className="closed-tab-icon-p" onClick={()=>this.tabClose(item)}>
                            <span><X className="closed-tab-icon-p"/></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
        </div>
        <div className="user-menu-p-wrapper">
          <div className="user-menu-icon-p jackpot-ico ng-star-inserted">
            <X className = "poker-header-icon" onClick = {() => this.closeGame()} />
          </div>
          <a target="_blank" className="user-menu-icon-p live-chat-p ng-star-inserted" href="https://igamez.ai/contact-us/"  rel="noopener noreferrer">
            <Trello className = "poker-header-icon"/>
          </a>
          <div className="user-menu-icon-p settings-p ng-star-inserted">
            <Settings className = "poker-header-icon"/>
          </div>
          {user && user.token ? 
            <>
              <div className = "user-menu-icon-p pl-1 pr-1" >
                <h4 className = "poker-header-letter">{user.balance + " " + user.currency}</h4>
              </div>
              <div className = "user-menu-icon-p pl-1 pr-1" >
                <h4 className = "poker-header-letter">{user.playerName}</h4>
              </div>
            </> : ""
          }
        </div>
        <ExitModal />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.auth.user,
    headerData : state.poker.headerData,
    currentRoom : state.poker.currentRoom,
    isLobby : state.poker.isLobby
  }
}

const mapDispatchToProps = {
  activeTab,
  tabClose,
  activeLobby,
  exitModalChange,
  closeGame
}

export default connect(mapStateToProps, mapDispatchToProps)(PokerHeader)