import React, { useState } from 'react'
import type { Artwork } from '../types/artwork'


type ExhibitionSectionProps = {
    removeFromExhibition: (artwork: Artwork) => void
    exhibition: Artwork[]
    setExhibition: (artwork: Artwork[]) => void
}
function ExhibitionSection({ exhibition, setExhibition, removeFromExhibition }: ExhibitionSectionProps) {

  if( ! exhibition || exhibition.length === 0 ) {
    return null
  }
    
  return (
    <div> 
      <h1>User Exhibition</h1>
        {exhibition.map((artwork) => (
          
            <div key={artwork.id}>
                <img src={artwork.image} 
                alt={artwork.title} 
                width="200"
                height="200"/>
                <p>{artwork.title}</p>
                <p>{artwork.artist}</p>
                <button onClick={() => removeFromExhibition(artwork)}>Remove</button>
            </div>
        ))}
        <button onClick={() => setExhibition([])}>Clear Exhibition</button>
        <p>Total artworks: {exhibition.length}</p>
        
    </div>
  )
}

export default ExhibitionSection