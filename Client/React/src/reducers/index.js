import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer';
import todoReducer from './todoReducer';

export default combineReducers({
    authReducer,
    userReducer,
    todoReducer
});