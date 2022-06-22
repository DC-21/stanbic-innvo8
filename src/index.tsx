import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import App from './App';
import store, { persistor } from './redux/store';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    </PersistGate>
  </BrowserRouter>
);
