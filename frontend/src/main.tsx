import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { UserProvider } from './components/UserProvider.tsx'
import LoadingSpinner from './components/LoadingSpinner.tsx'

const clerkPubKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

// Performance optimization: Use requestIdleCallback for non-critical initialization
const initApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
        <UserProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="w-full min-h-screen bg-[#000522] text-white font-poppins">
              <App />
            </div>
          </Suspense>
        </UserProvider>
      </ClerkProvider>
    </StrictMode>,
  )
}

// Use requestIdleCallback if available, otherwise fallback to setTimeout
if ('requestIdleCallback' in window) {
  requestIdleCallback(initApp)
} else {
  setTimeout(initApp, 0)
}
