import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import ExhibitionSection from './components/ExhibitionSection'
import type { Artwork } from './types/artwork'

function App() {
  const [exhibition, setExhibition] = useState<Artwork[]>([])

  const addToExhibition = (artwork: Artwork) => {
    setExhibition([...exhibition, artwork])
  }

  const removeFromExhibition = (artwork: Artwork) => {
    setExhibition(exhibition.filter((item) => item.id !== artwork.id))
  }

  return (
    
    <div className="app">
      
      <Header />
      <main>
        <h2>Welcome to Assemblé</h2>
        <p>Create your own virtual exhibition from museum collections</p>
      </main>
      
      <SearchSection 
      addToExhibition={addToExhibition} 
      removeFromExhibition={removeFromExhibition}
      exhibition={exhibition}
      />
   
      <ExhibitionSection 
        exhibition={exhibition} 
        setExhibition={setExhibition}
        removeFromExhibition={removeFromExhibition}
      />
      </div>
  )
}

export default App
