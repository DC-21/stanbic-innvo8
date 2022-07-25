/* eslint-disable react/function-component-definition */
import * as React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import {
  ThemeProvider,
  StyledEngineProvider,
  Theme
} from '@mui/material/styles';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  onlineManager
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSnackbar } from 'notistack';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import Notifier from './Notifier';
// import { useQueryClientProvider } from './clientProvider';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // eslint-disable-next-line no-unused-vars
  interface DefaultTheme extends Theme {}
}

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
  const routing = useRoutes(routes);
  const { enqueueSnackbar } = useSnackbar();
  const isOnline = onlineManager.isOnline();
  const [queryClient] = React.useState<QueryClient>(
    new QueryClient({
      /**
       * Network mode (https://react-query-alpha.tanstack.com/guides/network-mode)
       */
      defaultOptions: {
        queries: {
          retry: 1,
          networkMode: 'offlineFirst'
        },
        mutations: {
          networkMode: 'offlineFirst'
        }
      },

      queryCache: new QueryCache({
        onError: (error, query) => {
          /**
           * Only show error toasts if we already have data in the cache
           * which indicates a failed background update
           */
          if (query.state.data === undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            enqueueSnackbar(`Something went wrong: ${error?.message}`, {
              variant: 'error'
            });
          }
        }
      })
    })
  );

  /**
   * Check if the user is online and if not, show a toast
   */
  if (!isOnline) {
    enqueueSnackbar(
      'You are offline. Please connect to the internet to use this app.',
      {
        variant: 'error',

        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 5000
      }
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Notifier />
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
