import React from "react"
import classnames from "classnames"

const ErrorpageLayout = ({ children, ...rest }) => {
  return (
    <div
      className={classnames(
        "full-layout wrapper bg-full-screen-image blank-page dark-layout",
      )}
    >
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container">
              <main className="main w-100" style = {{height : "100%" , paddingTop : "15%"}}>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorpageLayout
