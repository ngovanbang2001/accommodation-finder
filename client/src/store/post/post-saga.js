import { takeLatest } from "redux-saga/effects";
import { handleFavoritePosts } from "./post-handler";
import { setFavoritePosts } from "./post-slice";

export default function* postSaga() {
  yield takeLatest(setFavoritePosts.type, handleFavoritePosts);
}
