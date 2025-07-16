import { type Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReduxProviderWrapper = (
  component: React.ReactElement,
  store: Store,
) => {
  return (
    <Provider store={store}>
       {component}
    </Provider>
  );
};

const UseQueryWrapper = (
  component: React.ReactElement,
) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

export { ReduxProviderWrapper, UseQueryWrapper };