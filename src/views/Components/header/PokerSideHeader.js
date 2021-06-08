import React from "react";
import { connect } from "react-redux";
import pokerConfig from "../../../configs/pokerConfig";

class PokerSideHeader extends React.Component {
  state = {
    selectGameType : pokerConfig.selectGameBig[0].id,
  }

  render(){
    return(
      <div className="nav-category-component-p">
        <div className="t-nav-row-container-v">
          <div className="logo-p-contain">
            <div className="partner_logo ml-3"></div>
          </div>
          <div className="g-nav-container">
            <ul>
              {pokerConfig.selectGameBig.map((item,key) => (
                <li 
                  key = {key} 
                  onClick = {() => this.setState({selectGameType : item.id})} 
                  routerlinkactive="active" 
                  tabIndex="0" 
                  className={ this.state.selectGameType === item.id ? " active" : ""}
                >
                  <p><span>{item.name}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

export default connect(loadStateData,mapDispatchToProps)(PokerSideHeader)