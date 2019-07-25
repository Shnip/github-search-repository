import types, { IGithubState, IGithubAction } from "./types";

const initialState: IGithubState = {
  repositories: {
    incomplete_results: false,
    total_count: 0,
    items: null
  },
  errors: null
};

export default function githubReducer(
  state = initialState,
  action: IGithubAction
): IGithubState {
  switch (action.type) {
    case types.SET_REPOSITORIES:
      return {
        ...state,
        repositories: action.payload
      };
    case types.CLEAR_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: initialState.repositories
      };
    case types.REPOSITORY_FETCH_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
}
