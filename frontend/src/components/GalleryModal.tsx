import type { Artwork } from '../types/artwork'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ArtworkDetailModal from './ArtworkDetailModal'

type GalleryModalProps = {
  artworks: Artwork[]
  exhibitionName: string
  exhibitionDescription?: string
  exhibitionNotes?: string
  onClose: () => void
}

function GalleryModal({ artworks, exhibitionName, exhibitionDescription, exhibitionNotes, onClose }: GalleryModalProps) {
  if (!artworks.length) return null

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#050a1f]/95 shadow-[0_30px_80px_-40px_rgba(99,102,241,0.7)]">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#050a1f]/95 px-6 py-4">
          <div>
            <h2 id="gallery-modal-title" className="text-xl font-semibold text-white">
              {exhibitionName || 'Untitled exhibition'}
            </h2>
            
            {exhibitionDescription?.trim() && (
              <p className="mt-2 text-sm text-slate-200/80">{exhibitionDescription}</p>
            )}
            {exhibitionNotes?.trim() && (
              <p className="text-xs text-slate-300/70">Notes: {exhibitionNotes}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Close gallery"
          >
            ✕
          </button>
        </header>

        <div className="px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {artworks.map((artwork) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => setSelectedArtwork(artwork)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 text-left transition hover:border-indigo-300/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <img
                    src={artwork.image || 'https://picsum.photos/id/321/400/400/?blur=5'}
                    alt={artwork.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.src = 'https://picsum.photos/id/321/400/400/?blur=5'
                    }}
                  />
                  <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/40 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white transition duration-200 group-hover:flex">
                    View details
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-xs text-white">
                  <p className="text-sm font-semibold leading-tight">{artwork.title}</p>
                  {artwork.artist && (
                    <p className="text-indigo-200/80">{artwork.artist}</p>
                  )}
                  {artwork.museum && (
                    <p className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
                      {artwork.museum}
                    </p>
                  )}
                 
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedArtwork && (
        <ArtworkDetailModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </div>,
    document.body
  )
}

export default GalleryModal
