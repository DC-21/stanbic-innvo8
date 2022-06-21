import {
  SnackbarKey,
  VariantType,
  TransitionCloseHandler,
  TransitionEnterHandler,
  TransitionHandler,
  SnackbarAction
} from 'notistack';
import { useDispatch } from 'react-redux';

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export interface SnackBarOptions {
  key?: SnackbarKey;
  variant: VariantType;
  action?: SnackbarAction;
  onClose?: TransitionCloseHandler;
  onEntered?: TransitionEnterHandler;
  onEnter?: TransitionHandler;
}
interface Notification {
  message: string;
  options?: SnackBarOptions;
  preventDuplicate?: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}
export interface EnqueueSnackbar {
  readonly type: typeof ENQUEUE_SNACKBAR;
  readonly notification: {
    message: string;
    options?: SnackBarOptions;
    preventDuplicate?: boolean;
    anchorOrigin?: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
  };
}
export interface CloseSnackbar {
  readonly type: typeof CLOSE_SNACKBAR;
  readonly dismissAll: boolean;
  readonly key: SnackbarKey;
}
export interface RemoveSnackbar {
  readonly type: typeof REMOVE_SNACKBAR;
  readonly key: SnackbarKey;
}

export const enqueueSnackbar = (notification: Notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

export const closeSnackbar = (key: string | number) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = (key: string | number) => ({
  type: REMOVE_SNACKBAR,
  key
});
export const useNotify = () => {
  const dispatch = useDispatch();
  return (args: Notification) => dispatch(enqueueSnackbar(args));
};
export const useCloseSnackBar = () => {
  const dispatch = useDispatch();
  return (args: SnackbarKey) => dispatch(closeSnackbar(args));
};
