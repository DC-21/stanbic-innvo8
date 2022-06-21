export const SET_NOTIFY_LIST = 'SET_NOTIFY_LIST';

export interface NotifyList {
  message: string;
  timestamp: string;
}

export interface NotifySuccessAction {
  readonly type: typeof SET_NOTIFY_LIST;
  readonly payload: NotifyList;
}

export const loginSuccess = (notifyList: NotifyList): NotifySuccessAction => ({
  type: SET_NOTIFY_LIST,
  payload: notifyList
});
