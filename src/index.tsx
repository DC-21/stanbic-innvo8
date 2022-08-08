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
        <SnackbarProvider
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            fontSize: '20px'
          }}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </PersistGate>
  </BrowserRouter>
);
