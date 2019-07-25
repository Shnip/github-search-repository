import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const bindMiddleware = (middlewares: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    return compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return applyMiddleware(...middlewares);
};

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  bindMiddleware(middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
