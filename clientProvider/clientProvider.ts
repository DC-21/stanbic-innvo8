import { QueryCache, QueryClient, onlineManager } from 'react-query';
import { useSnackbar } from 'notistack';

const useQueryClientProvider = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isOnline = onlineManager.isOnline();

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

  const queryClient = new QueryClient({
    /**
     * Network mode (https://react-query-alpha.tanstack.com/guides/network-mode)
     */
    defaultOptions: {
      queries: {
        networkMode: 'offlineFirst'
      },
      mutations: {
        networkMode: 'offlineFirst'
      }
    },

    queryCache: new QueryCache({
      onError: (error, query) => {
        //  only show error toasts if we already have data in the cache
        // which indicates a failed background update
        if (query.state.data === undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          enqueueSnackbar(`Something went wrong: ${error?.message}`, {
            variant: 'error'
          });
        }
      }
    })
  });

  return queryClient;
};

export default useQueryClientProvider;
