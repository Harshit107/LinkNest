import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './GlobalStyles';
import Dashboard from './pages/Dashboard';

import { ThemeContextProvider } from './context/ThemeContext';

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
      <ThemeContextProvider>
        <GlobalStyles />
        <Dashboard />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
