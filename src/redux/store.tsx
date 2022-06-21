import { createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const middlewares: (ThunkMiddleware | Middleware)[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;
