import React from "react";
import { connect } from "react-redux";

class PokerFooter extends React.Component {

  state = {
    time : ""
  }

  componentDidMount(){
    this.calcTime();
  }

  calcTime(){
    setInterval(() => {
      var date = new Date();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var time = hour + ":" + minute + ":" + second;
      this.setState({time});
    } , 1000);
  }  

  render(){
    return(
      <div className="footer-wrapper-p">
        <div>
          <div className="f-left-container-p">
            <ul>
              <li className="padding-l-10">
                <i className="players-count-v">2</i>
                <span>Heads Up</span>
              </li>
              <li className="padding-l-10">
                <i className="players-count-v">6</i>
                <span>6 Max</span>
              </li>
              <li className="padding-l-10">
                <i className="players-count-v">9</i>
                <span>9 Max</span>
              </li>
              <li className="padding-l-10">
                <i className="icon-t-view-p icon-straddle-v">ST</i>
                <span>STRADDLE</span>
              </li>
              <li className="padding-l-10">
                <i className="icon-t-view-p icon-ante-v">A</i>
                <span>ANTE</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="f-right-container-p">
          <div>
            <div className="server-time-view-p">
              <span>Тime:</span>
              <i>{this.state.time}</i>
            </div>
            <div className="all-tables-info-v-p">
              <ul>
                <li>
                  <span>Players:</span>
                  <i>{this.props.playres}</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const loadStateData  = (state) =>{
  return {
    playres : state.poker.players
  }
}

const mapDispatchToProps = {

}

export default connect(loadStateData,mapDispatchToProps)(PokerFooter)