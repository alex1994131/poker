import { Root} from "../../../authServices/rootconfig"
import {AXIOS_REQUEST} from "./index";
import io from 'socket.io-client';
import { history } from "../../../history";

export const get_userinfor = (data) =>{  
  return async(dispatch) =>{
    var response = await AXIOS_REQUEST("getUserInfo" , data , dispatch , true);
    console.log(response)
    if(response.status){
      Root.socket = io(Root.admindomain,{query : response.data});
      Root.socket.on("currentPlayers" , data => {
        dispatch({type : "UPDATE_PLAYERS" , data : data});
      })
      return dispatch({ type : "PROFILE_USER" , data : response.data });
    }else{
      history.push("/404");
    }
  }
}