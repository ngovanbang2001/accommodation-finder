import { put } from "redux-saga/effects";
import { updateFavoritePosts } from "./post-slice";

export function* handleFavoritePosts({ payload }) {
  yield put(updateFavoritePosts(payload.favoritePosts));
}
