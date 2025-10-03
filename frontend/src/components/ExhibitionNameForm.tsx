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
    <section id="create"
    className="mx-auto max-w-5xl space-y-6 text-left mb-12"
    >
        <div 
        className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10 space-y-6"
        >
        <h2
        className="text-3xl font-semibold text-white">Create Exhibition</h2> 

    <form className="space-y-4">
        <label 
        className="flex flex-col gap-1 text-sm text-white/80">
        <span className="font-medium text-white">Exhibition Title</span>
        <input 
        required 
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
        type="text" 
        value={exhibitionName} 
        onChange={(e) => setExhibitionName(e.target.value)} />
    </label>

        <label 
         className="flex flex-col gap-1 text-sm text-white/80">
        <span className="font-medium text-white">Description</span>
        <input 
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
        type="text" 
        value={exhibitionDescription}
        onChange={(e) => setExhibitionDescription(e.target.value)} /> 
        </label>

        <label 
        className="flex flex-col gap-1 text-sm text-white/80">
        <span className="font-medium text-white">Notes (optional)</span>
        <input 
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
        type="text" 
        value={exhibitionNotes} 
        onChange={(e) => setExhibitionNotes(e.target.value)} />
        </label>
    </form>

    <button
     className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#000522] opacity-100 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
    type="button"
    disabled={!exhibitionName.trim()}
    onClick={() => {
        if(!exhibitionName.trim()) return 
        onCreate()}
    }
    >Create</button>
    </div>
    </section>
    
    </>
    
  )
}

export default ExhibitionNameForm