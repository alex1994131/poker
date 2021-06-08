import {toast} from "react-toastify"
import {Root} from "../../../authServices/rootconfig"
import {AXIOS_REQUEST} from "../auth/index";

export const fetchAllRoomData = () => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("fetchAllRoomData");
        if(rdata.status){
            if(rdata.data && rdata.data.length){
                dispatch({ type : "ALL_ROOM_INFO", data : {data : rdata.data} });
                dispatch({ type : "SELECT_ROOM", data : rdata.data[0] });
            }
        }else{
            toast.error(rdata.message);
        }
    }
}

export const fetchMyRoomData = () => {
    return async(dispatch , getState) => {
        var rdata = await AXIOS_REQUEST("fetchMyRoom");
        if(rdata.status){
            var receiveData = rdata.data;
            var headerData = getState().poker.headerData;
            var index = receiveData.players.findIndex(item => item.playerId === getState().auth.user.token);
            var roomindex = headerData.data.findIndex(item => item._id === receiveData._id);
            if(index > -1){
                if(roomindex > -1){
                    headerData.data[roomindex] = receiveData;
                }else{
                    headerData.data = [receiveData];
                }
                dispatch({ type : "CURRENT_ROOM_INFO", data : receiveData });
                dispatch({ type : "HEADER_ROOM_INFO", data : Object.assign({} , headerData) });
            }else{
                if(roomindex > -1){
                    headerData.data[index] = receiveData;
                    dispatch({ type : "HEADER_ROOM_INFO", data : Object.assign({} , headerData) });
                }
                if(getState().poker.currentRoom._id === receiveData._id){
                    dispatch({ type : "HEADER_ROOM_INFO", data : [receiveData] });
                    dispatch({ type : "CURRENT_ROOM_INFO", data : receiveData });
                }
            }
            dispatch({ type : "CURRENT_CLICK_ROBBY" , data : false })
        }
    }
}

export const roomOpen = (sendData) => {
    return async (dispatch , getState) => {
        var rdata = await AXIOS_REQUEST("fetchRoomById" , sendData);
        console.log(rdata);
        if(rdata.status){
            dispatch({ type : "CURRENT_ROOM_INFO", data : rdata.data });
            dispatch({ type : "CURRENT_CLICK_ROBBY" , data : false })
            var headerData = getState().poker.headerData;
            var index = headerData.data.findIndex(item => item._id === rdata.data._id);
            if(index > -1){
                headerData.data[index] = rdata.data;
            }else if(headerData.data.length){
                headerData.data.push(rdata.data);
            }else{
                headerData.data = [rdata.data];
            }
            dispatch({ type : "HEADER_ROOM_INFO", data :  Object.assign({} , headerData)});
        }else{
            toast.error(rdata.message);
            return;
        }
    }
}

export const roomJoin = (sendData) => {
    return async (dispatch , getState) => {
        var rdata = await AXIOS_REQUEST("roomJoin" , sendData);
        if(rdata.status){
            var userData = getState().auth.user;
            userData.balance = rdata.data.balance;
            dispatch({type : "PROFILE_USER" , data : userData})
        }else{
            toast.error(rdata.message);
        }
    }
}

export const userCall = (sendData) => {
    return () => {
        AXIOS_REQUEST("userCall" , sendData);
    }    
}

export const userFold = (sendData) => {
    return () => {
        AXIOS_REQUEST("userFold" , sendData);
    }    
}

export const userAllIn = (sendData) => {
    return () => {
        AXIOS_REQUEST("userAllIn" , sendData);
    }    
}

export const userBet = (sendData) => {
    return () => {
        AXIOS_REQUEST("userBet" , sendData);
    }    
}

export const userCheck = (sendData) => {
    return () => {
        AXIOS_REQUEST("userCheck" , sendData);
    }    
}

export const exitRoom = (sendData) => {
    return () => {
        AXIOS_REQUEST("exitRoom" , sendData);
    }    
}

export const sendMessage = (sendData) => {
    return () => {
        AXIOS_REQUEST("message" , sendData);
    }
}

export const closeGame = () => {
    return() => {
        window.location.href = "https://kasagames.com"
    }
}

/////////////////////////////////////////////////////
export const getRealtimeChange = ()=>{
    return async(dispatch , getState)=>{
        if(Root.socket){
            Root.socket.on("table_updated" , (data) => {

                var roomData = data.roomData;
                // var history = data.history;

                var allRooms = getState().poker.allRooms;
                var allRoomsIndex = allRooms.data.findIndex(item => item._id === roomData._id);
                if(allRoomsIndex > -1){
                    allRooms.data[allRoomsIndex] = roomData;
                    dispatch({type : "ALL_ROOM_INFO" , data : Object.assign({} , allRooms)});
                }

                var selectRooms = getState().poker.selectRooms;
                if(selectRooms._id === roomData._id){
                    dispatch({ type : "SELECT_ROOM", data : Object.assign({} , roomData) });
                }

                var currentRoom = getState().poker.currentRoom;
                if(currentRoom._id === roomData._id){
                    dispatch({type : "CURRENT_ROOM_INFO" , data : Object.assign({} , roomData)});
                }

                var headerData = getState().poker.headerData;
                var headerDataIndex = headerData.data.findIndex(item => item._id === roomData._id);
                if(headerDataIndex > -1){
                    headerData.data[headerDataIndex] = roomData;
                    dispatch({type : "HEADER_ROOM_INFO", data : Object.assign({} , headerData) });
                }

                // if(history){
                //     var histroyData = getState().poker.histroyData;
                //     histroyData.data.push(history);
                //     dispatch({type : "ROOM_HISTORY_CHANGE" , data : Object.assign({} , histroyData)})
                // }

            })

            Root.socket.on("exit_table" , async (data) => {
                var token = data.playerId;
                var roomId = data.roomId;
                var balance = data.balance;

                if(getState().auth.user.token === token){
                    Root.socket.emit("exit_room" , {roomId : roomId});
                    var headerData = getState().poker.headerData;
                    var newHeaderData = [];
                    for(var i = 0 ; i <headerData.data.length ; i ++){
                        if(headerData.data[i]._id !== roomId){
                            newHeaderData.push(headerData.data[i]);
                        }
                    }
                    var userData = getState().auth.user;
                    userData.balance = balance;
                    dispatch({type : "PROFILE_USER" , data : userData});
                    dispatch({type : "HEADER_ROOM_INFO", data : Object.assign({} , {data : newHeaderData}) });
                    dispatch({type : "CURRENT_CLICK_ROBBY" , data : true})
                    dispatch({type : "CURRENT_ROOM_INFO" , data : {} });
                }
            });

            Root.socket.on("room_message" , data => {
                var messageData = getState().poker.messages;
                messageData.data.push(data.data);
                dispatch({type : "SET_MESSAGE" , data : Object.assign({} , messageData)});
            })
        }
    }
}

/////////////////////////////////////////////////////////

export const clickRoom = (room) => {
    return async(dispatch) => {
        dispatch({ type : "SELECT_ROOM", data : room });
    }
}

export const activeTab = (header) => {
    return async (dispatch , getState) => {
        var headerData = getState().poker.headerData;
        var index = headerData.data.findIndex(item => item._id === header._id);
        if(headerData.data[index]){
            dispatch({type : "CURRENT_ROOM_INFO" , data : header });
            dispatch({type : "CURRENT_CLICK_ROBBY" , data : false })
        }else{
            dispatch({type : "CURRENT_CLICK_ROBBY" , data : true})
            dispatch({type : "CURRENT_ROOM_INFO" , data : {} });
        }
    }
}

export const tabClose = (header) => {
    return async (dispatch , getState) => {
        var headerData = getState().poker.headerData;
        var newHeader = [];
        for(var i = 0 ; i < headerData.data.length ; i ++){
            if(headerData.data[i]._id !== header.roomId){
                newHeader.push(headerData.data[i]);
            }
        }
        dispatch({type : "HEADER_ROOM_INFO" , data : Object.assign({} , {data:newHeader})})
        dispatch({type : "CURRENT_ROOM_INFO" , data : {} });
        dispatch({type : "CURRENT_CLICK_ROBBY" , data : true })
    }
}

export const activeLobby = () => {
    return async (dispatch) => {
        dispatch({type : "CURRENT_CLICK_ROBBY" , data : true})
    }
}

export const buyInModalOpen = (data) => {
    return async (dispatch) => {
        dispatch({type : "POKER_BUYIN_MODAL" , data : data})
    }
}

export const exitModalChange = (data , gameKey) => {
    return async (dispatch) => {
        dispatch({type : "POKER_EXIT_MODAL" , data : data})
        dispatch({type : "POKER_GAME_EXIT_MODAL" , data : gameKey})
    }
}

export const setPosition = (position) => {
    return async (dispatch) => {
        dispatch({ type : "SET_ROOM_POSITION" , data : position })
    }
}