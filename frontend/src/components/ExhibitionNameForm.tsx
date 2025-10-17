

type ExhibitionNameFormProps = {
  exhibitionName: string
  setExhibitionName: (name: string) => void
  exhibitionDescription: string
  setExhibitionDescription: (description: string) => void
  exhibitionNotes: string
  setExhibitionNotes: (notes: string) => void
  onCreate: () => void
  variant?: "default" | "compact"
  collapsed?: boolean
  onExpandToggle?: () => void
}

function ExhibitionNameForm({
  exhibitionName,
  setExhibitionName,
  exhibitionDescription,
  setExhibitionDescription,
  exhibitionNotes,
  setExhibitionNotes,
  onCreate,
  variant = "default",
  collapsed = false,
  onExpandToggle,
}: ExhibitionNameFormProps) {
  const wrapperClasses =
    variant === "compact"
      ? "mx-auto w-full max-w-3xl px-4"
      : "mx-auto max-w-5xl px-6"

  const cardClasses =
    variant === "compact"
      ? "rounded-2xl bg-[#E5E1DA]/90 p-5 backdrop-blur-sm ring-1 ring-[#1b1c17]/20 shadow-[0_18px_45px_-25px_rgba(27,28,23,0.25)]"
      : "rounded-2xl bg-[#E5E1DA]/80 p-6 backdrop-blur-sm ring-1 ring-[#1b1c17]/15"

  const showForm = !(variant === "compact" && collapsed)

  return (
    <section id="create" className={`${wrapperClasses} text-left`}>
      <div className={`${cardClasses} space-y-5`}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b1c17]/80 font-medium">
              Exhibition setup
            </p>
            <h2 className="text-2xl font-semibold text-[#1b1c17]">
              {exhibitionName?.trim() || 'Name your exhibition'}
            </h2>
            {showForm && (
              <p className="text-sm text-[#5A6B73]">
                Add a working title, story, and curatorial notes to anchor your exhibition.
              </p>
            )}
            {!showForm && (
              <div className="space-y-1 text-sm text-[#5A6B73]">
                {exhibitionDescription?.trim() && <p>{exhibitionDescription}</p>}
                {exhibitionNotes?.trim() && (
                  <p className="text-xs text-[#5A6B73]/80">Notes: {exhibitionNotes}</p>
                )}
              </div>
            )}
          </div>

          {variant === "compact" && (
            <button
              type="button"
              onClick={onExpandToggle}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#1b1c17]/30 bg-[#F1F0E8] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1b1c17] transition hover:border-[#1b1c17]/50 hover:bg-[#E5E1DA]"
            >
              {collapsed ? 'Edit' : 'Collapse'}
            </button>
          )}
        </div>

        {showForm && (
          <>
            <form className="grid gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm text-[#5A6B73] md:col-span-1">
                <span className="font-medium text-[#1b1c17]">Exhibition title</span>
                <input
                  required
                  className="rounded-lg border-2 border-[#1b1c17]/20 bg-[#F1F0E8] px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#1b1c17]/40 focus:ring-2 focus:ring-[#1b1c17]/20"
                  type="text"
                  value={exhibitionName}
                  onChange={(e) => setExhibitionName(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-[#5A6B73] md:col-span-1">
                <span className="font-medium text-[#1b1c17]">Description</span>
                <input
                  className="rounded-lg border-2 border-[#1b1c17]/20 bg-[#F1F0E8] px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#1b1c17]/40 focus:ring-2 focus:ring-[#1b1c17]/20"
                  type="text"
                  value={exhibitionDescription}
                  onChange={(e) => setExhibitionDescription(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-[#5A6B73] md:col-span-1">
                <span className="font-medium text-[#1b1c17]">Notes (optional)</span>
                <input
                  className="rounded-lg border-2 border-[#1b1c17]/20 bg-[#F1F0E8] px-3 py-2 text-[#1b1c17] outline-none transition focus:border-[#1b1c17]/40 focus:ring-2 focus:ring-[#1b1c17]/20"
                  type="text"
                  value={exhibitionNotes}
                  onChange={(e) => setExhibitionNotes(e.target.value)}
                />
              </label>
            </form>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#1b1c17]/30 bg-[#1b1c17] px-4 py-2 text-sm font-medium text-[#F1F0E8] transition hover:bg-[#1b1c17]/90 hover:border-[#1b1c17]/50 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                disabled={!exhibitionName.trim()}
                onClick={() => {
                  if (!exhibitionName.trim()) return
                  onCreate()
                }}
              >
                Save exhibition details
              </button>
             
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ExhibitionNameForm