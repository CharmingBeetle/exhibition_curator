

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
      ? "rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/15 shadow-[0_18px_45px_-25px_rgba(99,102,241,0.55)]"
      : "rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10"

  const showForm = !(variant === "compact" && collapsed)

  return (
    <section id="create" className={`${wrapperClasses} text-left`}>
      <div className={`${cardClasses} space-y-5`}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/80">
              Exhibition setup
            </p>
            <h2 className="text-2xl font-semibold text-white">
              {exhibitionName?.trim() || 'Name your exhibition'}
            </h2>
            {showForm && (
              <p className="text-sm text-slate-200/80">
                Add a working title, story, and curatorial notes to anchor your exhibition.
              </p>
            )}
            {!showForm && (
              <div className="space-y-1 text-sm text-slate-200/80">
                {exhibitionDescription?.trim() && <p>{exhibitionDescription}</p>}
                {exhibitionNotes?.trim() && (
                  <p className="text-xs text-slate-300/70">Notes: {exhibitionNotes}</p>
                )}
              </div>
            )}
          </div>

          {variant === "compact" && (
            <button
              type="button"
              onClick={onExpandToggle}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/15"
            >
              {collapsed ? 'Edit' : 'Collapse'}
            </button>
          )}
        </div>

        {showForm && (
          <>
            <form className="grid gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm text-white/80 md:col-span-1">
                <span className="font-medium text-white">Exhibition title</span>
                <input
                  required
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
                  type="text"
                  value={exhibitionName}
                  onChange={(e) => setExhibitionName(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-white/80 md:col-span-1">
                <span className="font-medium text-white">Description</span>
                <input
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
                  type="text"
                  value={exhibitionDescription}
                  onChange={(e) => setExhibitionDescription(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-white/80 md:col-span-1">
                <span className="font-medium text-white">Notes (optional)</span>
                <input
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-indigo-500/60"
                  type="text"
                  value={exhibitionNotes}
                  onChange={(e) => setExhibitionNotes(e.target.value)}
                />
              </label>
            </form>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#000522] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                disabled={!exhibitionName.trim()}
                onClick={() => {
                  if (!exhibitionName.trim()) return
                  onCreate()
                }}
              >
                Save exhibition details
              </button>
              <span className="text-xs text-slate-300/70">
                These details appear alongside your gallery preview.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ExhibitionNameForm