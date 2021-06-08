import React from "react";
import { connect } from "react-redux";
import { fetchAllRoomData , clickRoom  } from "../../redux/actions/poker";
import pokerConfig from "../../configs/pokerConfig";

class PokerTable extends React.Component {

  state = {
    selectGameType : pokerConfig.selectGameBig[0].id,
    AllRoomInfo : []
  }

  async componentDidMount(){
    await this.props.fetchAllRoomData();
    this.setState({AllRoomInfo : this.props.AllRoomInfo.data})
  }

  render(){
    return(
      <div className="tables-list-component-v">
        <div className="list-p-lobby-wrapper">
          <div className="lobby-p-list-container">
            <div className="list-view-box-p">
                <div className="lobby-p-list-items-rows">
                  <div className="title-filter-row-view">
                    <ul>
                      <li><span> Name </span></li>
                      <li><span> Game </span></li>
                      <li><span> Type </span></li>
                      <li><span> Stakes </span></li>
                      <li><span> Players </span></li>
                      {/* <li><span> Wait </span></li> */}
                    </ul>
                  </div>

                  {this.state.AllRoomInfo.map((Item , i) => (
                    <ul key = {i} onClick = {() => this.props.clickRoom(Item)} className={ this.props.selectRooms._id === Item._id ? "poker-room-rows active" : "poker-room-rows"}>
                      <li><p> {Item.roomName} </p></li>
                      <li className=""><p> {Item.roomType} </p></li>
                      <li className="">
                        <span className="type-p-v">
                          <div className = "players-count-v">{Item.maxplayers}</div>
                          {Item.isSt ? <div className = "players-count-v icon-straddle-v">ST</div> : ""}
                          {Item.isA ? <div className = "players-count-v icon-ante-v">A</div> : ""}
                        </span>
                        <span className="icon-t-view-p icon-straddle-p-v"></span>
                        <span className="icon-t-view-p icon-ante-p-v"></span>
                      </li>
                      <li className="">
                        <span className="stake-p-view"> {this.props.user.currency + " " + Item.smallblind + " ~  " + this.props.user.currency + " " + Item.bigblind} </span>
                      </li>
                      <li className=""><p>{Item.players.length}</p></li>
                      {/* <li><p>{Item.seeUsers.length}</p></li> */}
                    </ul>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const loadStateData  = (state) =>{
  return {
    AllRoomInfo : state.poker.allRooms,
    selectRooms : state.poker.selectRooms,
    user : state.auth.user
  }
}

const mapDispatchToProps = {
  fetchAllRoomData,
  clickRoom,
}

export default connect(loadStateData,mapDispatchToProps)(PokerTable)