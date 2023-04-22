import { all } from "redux-saga/effects";
import authSaga from "./auth/auth-saga";
import postSaga from "./post/post-saga";

export function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}
