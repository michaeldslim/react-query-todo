
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>React Query Todo App</h1>
          <p>Learn React Query with this interactive todo application</p>
        </header>
        
        <main className="app-main">
          <AddTodo />
          <TodoList />
        </main>
        
        <footer className="app-footer">
          <p>Built with React Query • Open DevTools to explore caching</p>
        </footer>
      </div>
      
      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
