
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '@/components/ErrorBoundary'

const container = document.getElementById("root")

if (!container) {
  throw new Error("Could not find root element")
}

// Create a QueryClient instance with error handling configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      // Remove unsupported useErrorBoundary option
    },
    mutations: {
      // Remove unsupported useErrorBoundary option
    },
  },
})

createRoot(container).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </ErrorBoundary>
);
