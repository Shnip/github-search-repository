import { takeEvery, put, call } from "redux-saga/effects";
import types, { IGithubAction } from "./types";
import { setErrors, setRepositories } from "./actions";
import axios from "axios";

function* watchGetRepositories() {
  yield takeEvery(types.GET_REPOSITORIES, fetchRepositories);
}

function* fetchRepositories(action: IGithubAction) {
  const { search, perPage, activePage } = action.payload;
  try {
    const repositories = yield call(() =>
      axios(
        `https://api.github.com/search/repositories?q=${search}&per_page=${perPage}&page=${activePage}`
      )
    );
    yield put(setRepositories(repositories.data));
  } catch (e) {
    yield put(setErrors(e.response.data));
  }
}

function* watchClearRepositories() {
  yield takeEvery(types.CLEAR_REPOSITORIES, clearRepositories);
}

function* clearRepositories() {
  yield put({ type: types.CLEAR_REPOSITORIES_SUCCESS });
}

function* watchClearErrors() {
  yield takeEvery(types.CLEAR_ERRORS, clearErrors);
}

function* clearErrors() {
  yield put({ type: types.CLEAR_ERRORS_SUCCESS });
}

export default [
  watchGetRepositories(),
  watchClearRepositories(),
  watchClearErrors()
];
