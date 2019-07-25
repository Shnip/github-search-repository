import types, { IGithubAction, IGithubRepository, IError } from "./types";
import { IGithubState } from "../../components/Github";

export const setRepositories = (
  repositories: IGithubRepository[]
): IGithubAction => ({
  type: types.SET_REPOSITORIES,
  payload: repositories
});

export const getRepositories = (repository: IGithubState): IGithubAction => ({
  type: types.GET_REPOSITORIES,
  payload: repository
});

export const clearRepositories = (): IGithubAction => ({
  type: types.CLEAR_REPOSITORIES
});

export const setErrors = (errors: IError) => ({
  type: types.REPOSITORY_FETCH_ERROR,
  payload: errors
});

export const clearErrors = (): IGithubAction => ({
  type: types.CLEAR_ERRORS
});
