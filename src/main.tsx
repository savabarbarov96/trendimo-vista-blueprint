
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"

const container = document.getElementById("root")

if (!container) {
  throw new Error("Could not find root element")
}

createRoot(container).render(
  <>
    <App />
    <Toaster />
  </>
);
