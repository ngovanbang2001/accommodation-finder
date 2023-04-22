import createSagaMiddleware, { Task } from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers";
import { rootSaga } from "./rootSaga";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: (gDM) => gDM().concat(sagaMiddleware),
  });
  store.Task = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore);
