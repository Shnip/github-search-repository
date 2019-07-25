export interface IRepositoryItem {
  id: number;
  html_url: string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  [propName: string]: any;
}

export interface IGithubRepository {
  incomplete_results: boolean;
  total_count: number;
  items: IRepositoryItem[] | null;
}

export interface IGithubState {
  repositories: IGithubRepository;
  errors: any;
}

export interface IGithubAction {
  type: string;
  payload?: any;
}

export interface IError {
  message: string;
  [propName: string]: any;
}

export default {
  SET_REPOSITORIES: "SET_REPOSITORIES",
  GET_REPOSITORIES: "GET_REPOSITORIES",
  CLEAR_REPOSITORIES: "CLEAR_REPOSITORIES",
  CLEAR_REPOSITORIES_SUCCESS: "CLEAR_REPOSITORIES_SUCCESS",
  REPOSITORY_FETCH_ERROR: "REPOSITORY_FETCH_ERROR",
  CLEAR_ERRORS: "CLEAR_ERRORS",
  CLEAR_ERRORS_SUCCESS: "CLEAR_ERRORS_SUCCESS"
};
