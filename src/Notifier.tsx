import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, SnackbarKey } from 'notistack';
import { removeSnackbar } from './redux/actions/notifications/notificationActions';
import { RootState } from './redux/reducers/rootReducer';

let displayed: SnackbarKey[] = [];

function Notifier() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (store: RootState) => store.notification.notifications || []
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          }
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
}

export default Notifier;
