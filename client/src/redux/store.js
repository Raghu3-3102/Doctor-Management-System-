// import {configureStore} from '@reduxjs/toolKit';
import { configureStore } from "@reduxjs/toolkit";
// import {combineReducers} from 'redux'
import { combineReducers } from "redux";
import { alertsSlice } from "./alerSlice";
import { UserSlice } from "./UserSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user : UserSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;