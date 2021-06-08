const initialState = {
  user : {},
  loading : false
}

const DataListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROFILE_USER":
      return { ...state, user: action.data}
    case "HOMEPAGELOADIN" :{
      return {...state,loading : action.data}
    }
    default:
      return state
  }
}

export default DataListReducer