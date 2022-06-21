import {
  User,
  LoginAction,
  LogoutAction,
  LoginSuccessAction,
  LoginErrorAction,
  RefreshTokenAction,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGOUT,
  REFRESH_TOKEN,
  UPDATE_SUCCESS,
  UpdateAction
} from '../../actions/userActions/userActions';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
  isAdminsLoading: false
};

interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdminsLoading: boolean;
}

export type ActionTypes =
  | LoginAction
  | LogoutAction
  | UpdateAction
  | LoginSuccessAction
  | LoginErrorAction
  | RefreshTokenAction;

const userReducer = (
  state: State = INITIAL_STATE,
  action: ActionTypes
): State => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
