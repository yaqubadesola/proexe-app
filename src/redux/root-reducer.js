import { combineReducers } from "redux";
import { usersReducer } from "./userReducer";

const rootReducers = combineReducers({
    users: usersReducer
})

export default rootReducers;