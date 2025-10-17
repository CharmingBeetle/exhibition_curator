import type { Artwork } from '../types/artwork'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import OptimizedImage from './OptimizedImage'

type ArtworkDetailModalProps = {
  artwork: Artwork
  onClose: () => void
}

function ArtworkDetailModal({ artwork, onClose }: ArtworkDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    // Focus management
    const previousActiveElement = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
      previousActiveElement?.focus()
    }
  }, [onClose])

  const fallbackImage = artwork.image || 'https://picsum.photos/id/321/800/1000/?blur=5'
  const museumName = artwork.museum.charAt(0).toUpperCase() + artwork.museum.slice(1)

  const overviewItems = [
    { label: 'Medium', value: artwork.medium },
    { label: 'Date', value: artwork.date },
    { label: 'Dimensions', value: artwork.dimensions },
    { label: 'Classification', value: artwork.classification },
    { label: 'Object type', value: artwork.objectName },
    { label: 'Culture', value: artwork.culture },
    { label: 'Country', value: artwork.country }
  ].filter((item) => Boolean(item.value))

  const hasTags = Boolean(artwork.tags?.length)

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-modal-title"
      aria-describedby="artwork-modal-description"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        role="presentation"
        onClick={onClose}
      />

      <article ref={modalRef} className="relative z-10 w-full max-w-lg sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-[#1b1c17]/20 bg-[#E5E1DA]/95 shadow-[0_32px_80px_-45px_rgba(27,28,23,0.4)]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1b1c17]/30 bg-[#F1F0E8] text-sm font-semibold uppercase tracking-[0.2em] text-[#1b1c17] transition hover:bg-[#E5E1DA] hover:border-[#1b1c17]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1c17]/30"
          aria-label="Close artwork details"
        >
          ✕
        </button>

        <figure className="flex flex-col items-center gap-2 bg-[#F1F0E8]/80 px-4 pt-4 pb-3">
          <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg border-2 border-[#1b1c17]/20 bg-[#F1F0E8] flex items-center justify-center min-h-[200px]">
            <OptimizedImage
              src={fallbackImage}
              alt={artwork.title}
              className="w-full h-auto max-h-[40vh] sm:max-h-[45vh] lg:max-h-[50vh] object-contain"
              width={600}
              height={800}
              loading="eager"
            />
          </div>
          <figcaption className="text-center text-[0.65rem] uppercase tracking-[0.32em] text-[#5A6B73]">
            {museumName} Collection
            {artwork.department ? ` • ${artwork.department}` : ''}
          </figcaption>
        </figure>

        <div className="space-y-4 px-4 pb-5 pt-1">
          <header className="space-y-1 text-center">
            <h2 id="artwork-modal-title" className="text-lg font-semibold tracking-tight text-[#1b1c17]">
              {artwork.title}
            </h2>
            <div className="space-y-1 text-sm text-[#5A6B73]">
              <p className="text-[0.9rem] font-medium text-[#5A6B73]">
                {artwork.artist || 'Unknown artist'}
              </p>
            </div>
          </header>

          {artwork.description?.trim() && (
            <section className="rounded-2xl border-2 border-[#1b1c17]/15 bg-[#F1F0E8]/80 p-3 text-sm leading-relaxed text-[#5A6B73]">
              <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#1b1c17]">
                Overview
              </h3>
              <p
                id="artwork-modal-description"
                className="mt-2 text-[0.95rem] leading-relaxed text-[#5A6B73]"
              >
                {artwork.description}
              </p>
            </section>
          )}

          {!!overviewItems.length && (
            <section className="space-y-1">
              <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#1b1c17] text-center">
                Quick facts
              </h3>
              <dl className="space-y-1 text-center text-[0.9rem] text-[#5A6B73]">
                {overviewItems.map((item) => (
                  <div key={`${artwork.id}-${item.label}`} className="flex flex-wrap justify-center gap-2">
                    <dt className="font-semibold text-[#1b1c17]">{item.label}:</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {(hasTags || artwork.museumUrl) && (
            <footer className="flex flex-col items-center gap-3 border-t border-[#1b1c17]/20 pt-4">
              {hasTags && (
                <div className="w-full space-y-2 text-center">
                  <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#1b1c17]">
                    Tags
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {artwork.tags!.map((tag) => (
                      <span
                        key={tag.term}
                        className="rounded-full border border-[#1b1c17]/30 bg-[#F1F0E8] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#1b1c17]"
                      >
                        #{tag.term?.trim().replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {artwork.museumUrl && (
                <a
                  href={artwork.museumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#1b1c17]/30 bg-[#1b1c17] px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#F1F0E8] transition hover:bg-[#1b1c17]/90 hover:border-[#1b1c17]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1c17]/30"
                >
                  View on {museumName}
                </a>
              )}
            </footer>
          )}
        </div>
      </article>
    </div>,
    document.body
  )
}

export default ArtworkDetailModal