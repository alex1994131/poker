import React from "react"
import FullLayout from "./FullpageLayout"
import ErrorLayout from "./ErrorpageLayout"

const layouts = {
  full : FullLayout,
  error : ErrorLayout
}

const ContextLayout = React.createContext()

class Layout extends React.Component {
  state = {
    activeLayout: "",
    width: window.innerWidth,
    lastLayout: null,
  }

  updateWidth = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  render() {
    const { children } = this.props
    return (
      <ContextLayout.Provider
        value={{
          state: this.state,
          fullLayout : layouts["full"],
          errorLayout : layouts["error"],
        }}
      >
        {children}
      </ContextLayout.Provider>
    )
  }
}

export  { Layout, ContextLayout }