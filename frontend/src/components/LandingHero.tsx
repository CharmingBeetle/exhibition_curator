import BackgroundImage from "./BackgroundSlideshow";

interface LandingHeroProps {
  hasCreatedExhibition: boolean;
  onShowExhibition: () => void;
  onStartExhibition: () => void;
}

const LandingHero = ({ hasCreatedExhibition, onShowExhibition, onStartExhibition }: LandingHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#89A8B2]/20 via-transparent to-[#B3C8CF]/10 min-h-[60vh]">
      <BackgroundImage className="pointer-events-none" />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute inset-0 bg-gradient-radial from-[#89A8B2]/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#B3C8CF]/8 to-[#E5E1DA]/10" />

      <div className="relative z-10 w-6/12 max-w-2xl mt-6 ml-12 pl-6 pr-12 pb-6 pt-20 sm:pl-8 sm:pr-16 sm:pt-12 md:pl-12 md:pr-20 lg:pt-12">
        <div className="flex flex-col gap-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-semibold text-[#1b1c17] sm:text-3xl lg:text-6xl">
              Your own virtual exhibition from world-leading collections.
            </h1>
            <p className="text-base text-[#1b1c17] sm:text-lg">
              Create a narrative and
              present your exhibition in your own digital space.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={onStartExhibition}
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-[#89A8B2]/30 bg-gradient-to-r from-[#F1F0E8] to-[#E5E1DA] px-8 py-4 text-base font-medium text-[#1b1c17] shadow-[0_8px_32px_rgba(137,168,178,0.3)] backdrop-blur transition-all duration-300 hover:border-[#89A8B2]/50 hover:from-[#E5E1DA] hover:to-[#B3C8CF] hover:shadow-[0_12px_40px_rgba(137,168,178,0.4)] focus:outline-none focus:ring-2 focus:ring-[#89A8B2]/50 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Start creating your exhibition"
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
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
