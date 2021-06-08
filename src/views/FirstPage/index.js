import React from "react";
import { connect } from "react-redux";

import PokerNavHeader from "../Components/header/PokerNavHeader";
import PokerSideHeader from "../Components/header/PokerSideHeader";

import PokerTable from "./PokerTable.js";
import PokerPane from "./PokerPane.js";
import PokerFooter from "./PokerFooter.js";

class Poker extends React.Component {

  render(){
    return(
      <div className = "firstHeader">
        <PokerSideHeader />
        <div className="lobby-wrapper">
          <div className="left-column-l-p">
            <PokerNavHeader />
            <PokerTable />
          </div>
          <div className="right-column-l-p">
            <PokerPane />
          </div>
        </div>
        <PokerFooter />
      </div>
    )
  }
}

const loadStateData  = (state) =>{
  return {
  }
}

const mapDispatchToProps = {
}

export default connect(loadStateData,mapDispatchToProps)(Poker)