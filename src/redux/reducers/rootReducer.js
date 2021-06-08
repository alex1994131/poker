import { combineReducers } from "redux"
import auth from "./auth/"
import poker from "./poker/index"

const rootReducer = combineReducers({
  auth: auth,
  poker : poker,
})

export default rootReducer
