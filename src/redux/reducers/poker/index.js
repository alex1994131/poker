const initialState = {
  allRooms : {data : []},
  selectRooms : {},
  currentRoom : {},
  headerData : {data : []},
  histroyData : {data : []},
  
  messages : {data : [
    {playerId : "Dealer" , message : "Hello Everyone !"},
    {playerId : "Dealer" , message : "Welcome to our poker room."},
    {playerId : "Dealer" , message : "Please earn money and enjoy your life."},
  ]},

  isLobby : true,
  buyInModal : false,
  exitModal : false,  
  exitGame : false,
  players : 0
}
  
const DataListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_ROOM_INFO":
      return { ...state , allRooms: action.data }
    case "SELECT_ROOM":
      return { ...state , selectRooms: action.data }
    case "CURRENT_ROOM_INFO" : 
      return { ...state , currentRoom : action.data }
    case "HEADER_ROOM_INFO" : 
      return{ ...state , headerData : action.data }
    case "CURRENT_CLICK_ROBBY" :
      return{ ...state , isLobby : action.data }
    case "POKER_BUYIN_MODAL" :
      return{ ...state , buyInModal : action.data }
    case "POKER_EXIT_MODAL" : 
      return { ...state , exitModal : action.data }
    case "POKER_GAME_EXIT_MODAL" : 
      return { ...state , exitGame : action.data }
    case "SET_ROOM_POSITION" : 
      return { ...state , position : action.data }
    case "SET_MESSAGE" : 
      return { ...state , messages : action.data }
    case "ROOM_HISTORY_CHANGE" : 
      return { ...state , histroyData : action.data }
    case "UPDATE_PLAYERS" : 
      return {...state , players : action.data}
    default:
      return state
  }
}

export default DataListReducer