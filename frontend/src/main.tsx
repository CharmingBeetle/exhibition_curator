import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { UserProvider } from './components/UserProvider.tsx'


const clerkPubKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <UserProvider>
        <div className="w-full min-h-screen bg-[#000522] text-white font-poppins">
          <App />
        </div>
      </UserProvider>
    </ClerkProvider>
  </StrictMode>,
)
