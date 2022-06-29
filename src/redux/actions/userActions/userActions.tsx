export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export interface User {
  status: string;
  resetPasswordToken: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  branch: string;
  gender: string;
  userType: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface LoginAction {
  readonly type: typeof LOGIN_START;
}
export interface LoginErrorAction {
  readonly type: typeof LOGIN_FAILURE;
  readonly payload: string;
}
export interface LogoutAction {
  readonly type: typeof LOGOUT;
}
export interface UpdateAction {
  readonly type: typeof UPDATE_SUCCESS;
  readonly payload: User;
}
export interface LoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: User;
}

export interface RefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN;
  readonly payload: User;
}

export const loginStart = (): LoginAction => ({
  type: LOGIN_START
});

export const loginSuccess = (user: User): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: user
});
export const updateDetails = (user: User): UpdateAction => ({
  type: UPDATE_SUCCESS,
  payload: user
});

export const loginFailure = (error: string): LoginErrorAction => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logOut = (): LogoutAction => {
  localStorage.removeItem('user');
  return {
    type: LOGOUT
  };
};

export const refreshToken = (user: User): RefreshTokenAction => ({
  type: REFRESH_TOKEN,
  payload: user
});
