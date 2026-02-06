import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './GlobalStyles';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
