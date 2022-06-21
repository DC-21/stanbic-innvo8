/* eslint-disable react/function-component-definition */
import * as React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import {
  ThemeProvider,
  StyledEngineProvider,
  Theme
} from '@mui/material/styles';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import Notifier from './Notifier';
import { useQueryClientProvider } from './clientProvider';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // eslint-disable-next-line no-unused-vars
  interface DefaultTheme extends Theme {}
}

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
  const routing = useRoutes(routes);
  const queryClient = useQueryClientProvider();

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
