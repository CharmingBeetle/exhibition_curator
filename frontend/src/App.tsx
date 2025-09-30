import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import ExhibitionSection from './components/ExhibitionSection'
import type { Artwork } from './types/artwork'
import ExhibitionNameForm from './components/ExhibitionNameForm'
import { SignedOut, SignedIn } from '@clerk/clerk-react'
import { useAppUser } from './components/UserProvider'

function App() {
  const [exhibition, setExhibition] = useState<Artwork[]>([])
  const [exhibitionName, setExhibitionName] = useState<string>('')
  const [exhibitionDescription, setExhibitionDescription] = useState<string>('')
  const [exhibitionNotes, setExhibitionNotes] = useState<string>('')
  const [hasCreatedExhibition, setHasCreatedExhibition] = useState(false)

  const { user } = useAppUser()
  
  const addToExhibition = (artwork: Artwork) => {
    setExhibition([...exhibition, artwork])
  }

  const removeFromExhibition = (artwork: Artwork) => {
    setExhibition(exhibition.filter((item) => item.id !== artwork.id))
  }

  const clearExhibition = () => {
    setExhibition([])
    setExhibitionName('')
    setExhibitionDescription('')
    setExhibitionNotes('')
    setHasCreatedExhibition(false)
  }
  return (
    
    <div className="app">
     
      <Header />
      <main>
        <SignedOut>
          <h2>Create your own virtual exhibition from museum collections</h2>
        </SignedOut>
        <SignedIn>
          <h2>Welcome back, {user?.firstName}</h2>
        </SignedIn>
      </main>
     
      <ExhibitionNameForm 
      exhibitionName={exhibitionName}
      setExhibitionName={setExhibitionName}
      exhibitionDescription={exhibitionDescription}
      setExhibitionDescription={setExhibitionDescription}
      exhibitionNotes={exhibitionNotes}
      setExhibitionNotes={setExhibitionNotes}
      onCreate={() => 
      setHasCreatedExhibition(true)
      } />

    {hasCreatedExhibition && (
      <>
      <SearchSection 
      addToExhibition={addToExhibition} 
      removeFromExhibition={removeFromExhibition}
      exhibition={exhibition}
      />
      
      <ExhibitionSection 
        exhibition={exhibition} 
        setExhibition={setExhibition}
        removeFromExhibition={removeFromExhibition}
        exhibitionName={exhibitionName}
        setExhibitionName={setExhibitionName}
        exhibitionDescription={exhibitionDescription}
        setExhibitionDescription={setExhibitionDescription}
        exhibitionNotes={exhibitionNotes}
        setExhibitionNotes={setExhibitionNotes}
        onClearExhibition={clearExhibition}
      />
      </>
      )}
    </div>
  )
}

export default App
