import BackgroundImage from "./BackgroundSlideshow";

interface LandingHeroProps {
  hasCreatedExhibition: boolean;
  isSignedIn: boolean;
  onStartSearch: () => void;
  onShowExhibition: () => void;
  onOpenSignIn: () => void;
}

const LandingHero = ({ hasCreatedExhibition, isSignedIn, onStartSearch, onShowExhibition, onOpenSignIn }: LandingHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#89A8B2]/20 via-transparent to-[#B3C8CF]/10 min-h-[60vh]">
      <BackgroundImage className="pointer-events-none" />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute inset-0 bg-gradient-radial from-[#89A8B2]/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#B3C8CF]/8 to-[#E5E1DA]/10" />

      <div className="relative z-10 w-6/12 max-w-xl ml-24 px-12 pb-12 pt-12 sm:pt-12 lg:pt-12">
        <div className="flex flex-col gap-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-semibold text-[#1b1c17] sm:text-5xl lg:text-6xl">
              Your own virtual exhibition from world-leading collections.
            </h1>
            <p className="text-base text-[#1b1c17] sm:text-lg">
              Create a narrative and
              present your exhibition in your own digital space.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {!isSignedIn ? (
                <button
                  onClick={onOpenSignIn}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-[#89A8B2]/30 bg-gradient-to-r from-[#F1F0E8] to-[#E5E1DA] px-8 py-4 text-base font-medium text-[#1b1c17] shadow-[0_8px_32px_rgba(137,168,178,0.3)] backdrop-blur transition-all duration-300 hover:border-[#89A8B2]/50 hover:from-[#E5E1DA] hover:to-[#B3C8CF] hover:shadow-[0_12px_40px_rgba(137,168,178,0.4)] focus:outline-none focus:ring-2 focus:ring-[#89A8B2]/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Sign in to start curating your exhibition"
                >
                  <span>Start Curating</span>
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onStartSearch}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-[#89A8B2]/30 bg-gradient-to-r from-[#F1F0E8] to-[#E5E1DA] px-8 py-4 text-base font-medium text-[#1b1c17] shadow-[0_8px_32px_rgba(137,168,178,0.3)] backdrop-blur transition-all duration-300 hover:border-[#89A8B2]/50 hover:from-[#E5E1DA] hover:to-[#B3C8CF] hover:shadow-[0_12px_40px_rgba(137,168,178,0.4)] focus:outline-none focus:ring-2 focus:ring-[#89A8B2]/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Start searching for artworks"
                >
                  <span>Start Searching</span>
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              )}
              
              {hasCreatedExhibition && (
                <button
                  onClick={onShowExhibition}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#89A8B2]/30 bg-[#F1F0E8]/80 px-6 py-4 text-base font-medium text-[#1b1c17] transition-all duration-300 hover:border-[#89A8B2]/50 hover:bg-[#E5E1DA] focus:outline-none focus:ring-2 focus:ring-[#89A8B2]/50 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
                  aria-label="View your current exhibition"
                >
                  <span>View Exhibition</span>
                </button>
              )}
            </div>
          </div>

          {/* <div className="relative mx-auto max-w-sm rounded-3xl border border-[#89A8B2]/20 bg-[#F1F0E8]/90 p-6 shadow-[0_24px_60px_-25px_rgba(137,168,178,0.45)] backdrop-blur">
            <div className="mt-6 space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[#89A8B2]">
                What you can do
              </p>
              <ul className="space-y-3 text-sm text-[#1b1c17]">
                <li className="rounded-2xl border border-[#89A8B2]/20 bg-[#E5E1DA]/50 px-4 py-3">
                  Curate cross-institution exhibitions with a few clicks.
                </li>
                <li className="rounded-2xl border border-[#89A8B2]/20 bg-[#E5E1DA]/50 px-4 py-3">
                  Build a storyline with notes, context, and moodboards.
                </li>
                <li className="rounded-2xl border border-[#89A8B2]/20 bg-[#E5E1DA]/50 px-4 py-3">
                  Share your exhibition with collaborators or the public
                  instantly.
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
