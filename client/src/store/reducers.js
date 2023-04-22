import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import postSlice from "./post/post-slice";

export const reducer = combineReducers({
  auth: authSlice,
  post: postSlice
});
