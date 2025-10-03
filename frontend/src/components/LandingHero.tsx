import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline"

interface LandingHeroProps {
  hasCreatedExhibition: boolean
}

const LandingHero = ({ hasCreatedExhibition }: LandingHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-500/10">
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center blur-3xl">
        <div className="h-64 w-[32rem] bg-indigo-500/40" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12 sm:pt-12 lg:pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
          <div className="max-w-2xl space-y-6">
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
              Assemblé curator studio
            </span> */}
            <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Create your own virtual exhibition from world-leading collections.
            </h1>
            <p className="text-base text-slate-200 sm:text-lg">
              Search from world-renowned collections, create a narrative, and
              present your exhibition in your owndigital space.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <SignedOut>
                <a
                  href="#auth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_40px_-20px_rgba(99,102,241,0.5)] transition hover:bg-slate-100"
                >
                  Start curating
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </SignedOut>
              <SignedIn>
                <a
                  href={hasCreatedExhibition ? "#exhibition" : "#search"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_40px_-20px_rgba(99,102,241,0.5)] transition hover:bg-slate-100"
                >
                  {hasCreatedExhibition
                    ? "Return to your exhibition"
                    : "Begin your first exhibition"}
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </SignedIn>
              {/* <a
                href="#search"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-indigo-300 hover:text-indigo-200"
              >
                Explore the collections
              </a> */}
            </div>
          </div>

          <div className="relative mx-auto max-w-sm rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_24px_60px_-25px_rgba(99,102,241,0.45)] backdrop-blur">
            {/* <div className="absolute inset-x-0 top-0 -mt-16 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200 space-y-4">
                <SparklesIcon className="h-7 w-7" aria-hidden="true" />
              </div>
            </div> */}
            {/* What you can do */}
            <div className="mt-6 space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-200">
                What you can do
              </p>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  Curate cross-institution exhibitions with a few clicks.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  Build a storyline with notes, context, and moodboards.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  Share your exhibition with collaborators or the public instantly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHero;