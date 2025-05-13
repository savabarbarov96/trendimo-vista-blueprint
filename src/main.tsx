
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const container = document.getElementById("root")

if (!container) {
  throw new Error("Could not find root element")
}

// Create a QueryClient instance
const queryClient = new QueryClient()

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
);
