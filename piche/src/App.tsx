import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Button from '@/components/Button/Button';
import List from '@/components/List/List';
import ErrorModal from '@/components/ErrorModal/ErrorModal';

import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='wiki-app'>
        <Button />
        <List />
        <ErrorModal />
      </div>
    </QueryClientProvider>
  )
}

export default App
