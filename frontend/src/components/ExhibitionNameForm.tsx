import React, { useState } from 'react'


type ExhibitionNameFormProps = {
    exhibitionName: string
    setExhibitionName: (name: string) => void
    exhibitionDescription: string
    setExhibitionDescription: (description: string) => void
    exhibitionNotes: string
    setExhibitionNotes: (notes: string) => void
    onCreate: () => void
}

function ExhibitionNameForm({ 
    exhibitionName, 
    setExhibitionName, 
    exhibitionDescription, 
    setExhibitionDescription, 
    exhibitionNotes, 
    setExhibitionNotes,
    onCreate
}: ExhibitionNameFormProps) {

    
  return (
    <>

    <fieldset>
        <legend>Create Exhibition</legend> <br />
    <form action="">
        <label htmlFor="exhibitionName">Exhibition Title <br /></label>
        <input 
        required 
        type="text" 
        value={exhibitionName} 
        onChange={(e) => setExhibitionName(e.target.value)} /><br /><br />
        <label htmlFor="exhibitionDescription">Description <br /></label>
        <input 
        type="text" 
        value={exhibitionDescription}
        onChange={(e) => setExhibitionDescription(e.target.value)} /> <br /><br />
        <label htmlFor="exhibitionNotes">Notes (optional) <br /></label>
        <input 
        type="text" 
        value={exhibitionNotes} 
        onChange={(e) => setExhibitionNotes(e.target.value)} /><br />
    </form> <br />

    <button
    type="button"
    disabled={!exhibitionName.trim()}
    onClick={() => {
        if(!exhibitionName.trim()) return 
        onCreate()}
    }
    >Create</button>
    </fieldset>
    
    </>
    
  )
}

export default ExhibitionNameForm