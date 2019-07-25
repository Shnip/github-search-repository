import { combineReducers } from "redux";
import githubReducer from "./github/reducers";
import { IGithubState } from "./github/types";

export interface rootState {
  github: IGithubState;
}
export default combineReducers({
  github: githubReducer
});
