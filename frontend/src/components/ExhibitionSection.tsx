import type { Artwork } from '../types/artwork'

type ExhibitionSectionProps = {
  exhibition: Artwork[]
  exhibitionName: string
  exhibitionDescription: string
  exhibitionNotes: string
  removeFromExhibition: (artwork: Artwork) => void
  onClearExhibition: () => void
}

function ExhibitionSection({
  exhibition,
  exhibitionName,
  exhibitionDescription,
  exhibitionNotes,
  removeFromExhibition,
  onClearExhibition,
}: ExhibitionSectionProps) {
  const hasArtworks = exhibition.length > 0

  return (
    <section
      id="exhibition"
      className="sticky top-28 z-30 space-y-4 rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl ring-1 ring-white/10"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
              Exhibition gallery
            </p>
            <h2 className="text-xl font-semibold text-white">
              {exhibitionName?.trim() || 'Untitled exhibition'}
            </h2>
            <p className="text-sm text-slate-200/80">
              {exhibitionDescription?.trim() || 'Add a description to set the tone for your gallery.'}
            </p>
            {exhibitionNotes?.trim() && (
              <p className="text-xs text-slate-300/70">Notes: {exhibitionNotes}</p>
            )}
          </div>

          <div className="flex min-w-fit items-center gap-3">
            {hasArtworks && (
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                {exhibition.length} selected
              </span>
            )}
            <button
              type="button"
              onClick={onClearExhibition}
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/20 hover:bg-white/15"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          {hasArtworks ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {exhibition.map((artwork) => (
                <figure
                  key={artwork.id}
                  className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-[0_12px_35px_-25px_rgba(99,102,241,0.65)]"
                >
                  <img
                    src={artwork.image || 'https://picsum.photos/id/321/200/200/?blur=5'}
                    alt={artwork.title}
                    className="pointer-events-none h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.src = 'https://picsum.photos/id/321/200/200/?blur=5'
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 py-2 opacity-0 transition duration-300 group-hover:opacity-100">
                    <p className="truncate text-xs font-medium text-white">{artwork.title}</p>
                    {artwork.artist && (
                      <p className="text-[0.65rem] text-indigo-200/80">{artwork.artist}</p>
                    )}
                    {artwork.museum && (
                      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
                        {artwork.museum}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromExhibition(artwork)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
                  >
                    Remove
                  </button>
                </figure>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-slate-300/80">
              <p>Your gallery is empty. Add artworks from the search results to build your selection.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ExhibitionSection