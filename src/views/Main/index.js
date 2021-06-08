import React from "react"
import { connect } from 'react-redux'
import PokerRoom from "../Room";
import PokerPage from "../FirstPage";

class Main extends React.Component {
	render() {
		return (
			<React.Fragment>
				{
					this.props.isLobby ? <PokerPage /> : <PokerRoom />
				}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentRoom : state.poker.currentRoom,
		isLobby : state.poker.isLobby
	}
}
  
const mapDispatchToProps = {

}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main)