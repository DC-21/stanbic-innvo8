/* eslint-disable default-param-last */
import { SnackbarKey } from 'notistack';
import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  SnackBarOptions
} from '../../actions/notifications/notificationActions';

interface NotificationState {
  key: SnackbarKey;
  message: string;
  dismissed: boolean;
  options?: SnackBarOptions;
}
interface State {
  notifications: NotificationState[];
}

const initialState: State = {
  notifications: []
};

const notificationsReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification
          }
        ]
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};

export default notificationsReducer;
