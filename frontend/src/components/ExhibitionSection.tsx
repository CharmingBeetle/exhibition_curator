import React, { useState } from 'react'
import type { Artwork } from '../types/artwork'


type ExhibitionSectionProps = {
    removeFromExhibition: (artwork: Artwork) => void
    exhibition: Artwork[]
    setExhibition: (artwork: Artwork[]) => void
    exhibitionName: string
    setExhibitionName: (name: string) => void
    exhibitionDescription: string
    setExhibitionDescription: (description: string) => void
    exhibitionNotes: string
    setExhibitionNotes: (notes: string) => void
    onClearExhibition: () => void
}
function ExhibitionSection({ 
  exhibition, 
  setExhibition, 
  removeFromExhibition, 
  exhibitionName, 
  setExhibitionName, 
  exhibitionDescription, 
  setExhibitionDescription, 
  exhibitionNotes, 
  setExhibitionNotes,
  onClearExhibition,
}: ExhibitionSectionProps) {

  if( !exhibition || exhibition.length === 0 ) {
    return null
  }
    
  return (
    <section> 
      <h2>{exhibitionName}</h2>
      <p>Description: {exhibitionDescription}</p>
      <p>Notes: {exhibitionNotes}</p>

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
        <button 
        onClick={onClearExhibition}>Clear Exhibition</button>
        <p>Total artworks: {exhibition.length}</p>
    </section>
  )
}

export default ExhibitionSection