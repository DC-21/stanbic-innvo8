import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserReducer from './userReducer/userReducer';
import notificationsReducer from './notifications/notificationsReducer';
import notifyListReducer from './notifyListReducer/notifyListReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'notifyList']
};
const rootReducer = combineReducers({
  user: UserReducer,
  notification: notificationsReducer,
  notifyList: notifyListReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
