import { all } from "redux-saga/effects";
import githubSagas from "./github/sagas";

function* rootSaga() {
  yield all([...githubSagas]);
}

export default rootSaga;
