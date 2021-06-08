import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Lock} from "react-feather"

export class pokerheader extends Component {
  render() {
    return (
      <React.Fragment>
        <p className = "poker-buyin-error-msg">
          <span> <Lock color = {"#ff00009e"} size={20} /></span> &nbsp;&nbsp; {this.props.error}
        </p>
        <p>
          {this.props.errormsg}
        </p>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(pokerheader)