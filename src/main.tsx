import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './i18n'
import App from './App'
import { warmUpVoices } from './lib/voice'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

// Chrome loads voices asynchronously — warm them after first gesture
if (typeof window !== 'undefined') {
  const warm = () => {
    warmUpVoices()
    window.removeEventListener('pointerdown', warm)
    window.removeEventListener('keydown', warm)
  }
  window.addEventListener('pointerdown', warm, { once: true })
  window.addEventListener('keydown', warm, { once: true })
  // Also try immediately (works on some browsers)
  warmUpVoices()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
