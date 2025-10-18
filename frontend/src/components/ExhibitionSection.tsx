import { useRef, useState } from "react";
import type { Artwork } from "../types/artwork";
import GalleryModal from "./GalleryModal";

type ExhibitionSectionProps = {
  exhibition: Artwork[];
  exhibitionName: string;
  exhibitionDescription: string;
  exhibitionNotes: string;
  removeFromExhibition: (artwork: Artwork) => void;
  onClearExhibition: () => void;
};

function ExhibitionSection({
  exhibition,
  exhibitionName,
  exhibitionDescription,
  exhibitionNotes,
  removeFromExhibition,
  onClearExhibition,
}: ExhibitionSectionProps) {
  const hasArtworks = exhibition.length > 0;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleScroll = (direction: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = direction * 180;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id="exhibition"
      className="sticky top-40 z-30 space-y-4 rounded-3xl border-2 border-[#1b1c17]/20 bg-[#89A8B2]/90 p-6 backdrop-blur-xl ring-1 ring-[#1b1c17]/15 shadow-[0_18px_45px_-25px_rgba(27,28,23,0.25)]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b1c17]/80">
              Exhibition gallery
            </p>
            <h2 className="text-xl font-semibold text-[#1b1c17]">
              {exhibitionName?.trim() || "Untitled exhibition"}
            </h2>
            <p className="text-sm text-[#5A6B73]">
              {exhibitionDescription?.trim() || ""}
            </p>
            {exhibitionNotes?.trim() && (
              <p className="text-xs text-[#5A6B73]/80">
                Notes: {exhibitionNotes}
              </p>
            )}
          </div>

          <div className="flex min-w-fit flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
            {hasArtworks && (
              <span className="rounded-full border-2 border-[#1b1c17]/30 bg-[#F1F0E8] px-3 py-1 text-xs text-[#1b1c17]">
                {exhibition.length} selected
              </span>
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <button
                type="button"
                onClick={() => setShowGalleryModal(true)}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#1b1c17]/30 bg-[#F1F0E8] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] transition hover:border-[#1b1c17]/50 hover:bg-[#E5E1DA]"
                disabled={!hasArtworks}
              >
                View gallery
              </button>
              <button
                type="button"
                onClick={onClearExhibition}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#1b1c17]/30 bg-[#F1F0E8] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] transition hover:border-[#1b1c17]/50 hover:bg-[#E5E1DA]"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl border-2 border-[#1b1c17]/15 bg-[#F1F0E8]/80 p-6">
          {hasArtworks ? (
            <>
              {exhibition.length > 3 && (
                <>
                  <button
                    type="button"
                    aria-label="Scroll gallery left"
                    onClick={() => handleScroll(-1)}
                    className="absolute left-0 top-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#1b1c17]/30 bg-[#E5E1DA] text-base text-[#1b1c17] opacity-90 shadow-lg transition hover:opacity-100 hover:bg-[#F1F0E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1c17]/30 md:flex"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    aria-label="Scroll gallery right"
                    onClick={() => handleScroll(1)}
                    className="absolute right-0 top-1/2 hidden h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#1b1c17]/30 bg-[#E5E1DA] text-base text-[#1b1c17] opacity-90 shadow-lg transition hover:opacity-100 hover:bg-[#F1F0E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1c17]/30 md:flex"
                  >
                    ›
                  </button>
                </>
              )}

              <div
                ref={scrollContainerRef}
                className="no-scrollbar flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              >
                {exhibition.map((artwork) => (
                  <figure
                    key={artwork.id}
                    onClick={() => setShowGalleryModal(true)}
                    className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-[#1b1c17]/20 bg-[#F1F0E8] shadow-[0_12px_35px_-25px_rgba(27,28,23,0.25)] cursor-pointer"
                  >
                    <img
                      src={
                        artwork.image ||
                        "https://picsum.photos/id/321/200/200/?blur=5"
                      }
                      alt={artwork.title}
                      className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://picsum.photos/id/321/200/200/?blur=5";
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="mb-1 text-[0.6rem] uppercase tracking-[0.3em] text-[#B3C8CF]/70">
                        View details
                      </span>
                      <p className="truncate text-xs font-medium text-[#1b1c17]">
                        {artwork.title}
                      </p>
                      {artwork.artist && (
                        <p className="text-[0.65rem] text-[#B3C8CF]/80">
                          {artwork.artist}
                        </p>
                      )}
                      {artwork.museum && (
                        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[#1b1c17]/50">
                          {artwork.museum}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromExhibition(artwork);
                      }}
                      className="absolute right-2 top-2 rounded-full border border-[#1b1c17]/30 bg-[#E5E1DA]/90 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#1b1c17] transition hover:bg-[#F1F0E8] hover:border-[#1b1c17]/50"
                    >
                      Remove
                    </button>
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-[#5A6B73]">
              <p>Your gallery is empty.</p>
            </div>
          )}
        </div>
      </div>
      {showGalleryModal && (
        <GalleryModal
          artworks={exhibition}
          exhibitionName={exhibitionName}
          exhibitionDescription={exhibitionDescription}
          exhibitionNotes={exhibitionNotes}
          onClose={() => setShowGalleryModal(false)}
        />
      )}
    </section>
  );
}

export default ExhibitionSection;
