import {combineReducers} from "redux";
import {personalDataReducer} from "./personalDataReducer";
import {socketReducer} from "./socketReducer"

export const rootReducer = combineReducers({
    personalDataReducer,
    socketReducer
})