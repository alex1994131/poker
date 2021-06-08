import React , { Suspense , lazy } from "react";
import { Router , Switch , Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { ContextLayout } from "./utility";
import { get_userinfor } from "./redux/actions/auth/loginActions";
import { getRealtimeChange , fetchMyRoomData } from "../src/redux/actions/poker/index";
import { ToastContainer } from "react-toastify";
// import pokerConfig from "./configs/pokerConfig";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import queryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/plugins/extensions/toastr.scss";

const ERROR = lazy(() =>  import("./views/Main/404"));
const Main = lazy(() =>  import("./views/Main"));

const RouteConfig = ({ component: Component , fullLayout , errorLayout , ...rest }) => {
  return(
    <Route {...rest}
      render={props => {
        return (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag = fullLayout === true ? context.fullLayout : context.errorLayout
              return (
                <LayoutTag {...props} permission={"props.user"} >
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
}

const mapStateToProps = state => { return { user : state.auth.user }}

const AppRoute = connect(mapStateToProps,{})(RouteConfig)

class AppRouter extends React.Component {
  async componentDidMount(){
    var token = queryString.parse(history.location.search).token;
    var operator = queryString.parse(history.location.search).operator;

    await this.props.get_userinfor();
    if(token && operator){
      await this.props.fetchMyRoomData();
      this.props.getRealtimeChange();
    }
  }
  
  render() {
    return (
      <Router history={history}>
        {this.props.loading ? <Spinner /> : null}
        <Switch>
          <AppRoute path="/poker" component={Main} fullLayout />
          <AppRoute path="/404" component={ERROR} errorLayout />
          <AppRoute component={Main} fullLayout />
        </Switch>
        <ToastContainer />
      </Router>
    )
  }
}

const mapStateToPropss = (state) => ({ loading : state.auth.loading });
export default connect( mapStateToPropss , { get_userinfor , getRealtimeChange , fetchMyRoomData })(AppRouter);