import * as loginAction from "./loginActions";
import { Root } from "../../../authServices/rootconfig";
import { history } from "../../../history";
import axios from "axios";
import queryString from "query-string";

export default loginAction

export const instance = axios.create({
    baseURL: Root.adminurl,
    timeout: 5000,
    headers: {
		token : queryString.parse(history.location.search).token,
		operator : queryString.parse(history.location.search).operator,
		gameid : queryString.parse(history.location.search).gameid,
      	"Content-Type": "application/json",
    },
});

export const AXIOS_REQUEST = async (url,inputdata,dispatch,loading) =>{
	try{
		if(loading){
			dispatch({type : "HOMEPAGELOADIN",data : true})
		}
		var Response =  await instance.post( url , inputdata );
		if(loading){
			dispatch({type : "HOMEPAGELOADIN",data : false})
		}
		if(Response.data){
			return Response.data
		}else{
			return {status : false,data : "error"}
		}
	}catch(e){
		if(loading){
			dispatch({type : "HOMEPAGELOADIN",data : false})
		}
		return {status : false,data : "error"}
	}
}