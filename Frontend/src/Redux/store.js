import { createStore, applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import todoReducer from "./reducer";
import { thunk } from "redux-thunk";
import { authReducer } from './AuthReducer/reducer';
import { todosReducer } from './TodoReducer/reducer';


const reducer = combineReducers({ authReducer,todosReducer });
export const store = createStore(reducer, applyMiddleware(thunk));
