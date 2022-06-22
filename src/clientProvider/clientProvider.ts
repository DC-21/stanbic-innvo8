import { QueryCache, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import axios from './baseConfig';

const useQueryClientProvider = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = new QueryClient({
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

// All defualt query API goes here
axios.get('/');
// All default mutation API goes here

export default useQueryClientProvider;
