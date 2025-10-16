import LightRays from "../components/LightRays";

interface LandingHeroProps {
  hasCreatedExhibition: boolean;
  isSignedIn: boolean;
  onStartSearch: () => void;
  onShowExhibition: () => void;
  onOpenSignIn: () => void;
}

const LandingHero = ({}: LandingHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-500/10">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-400/3 to-purple-400/5" />

      <div className="absolute inset-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12 sm:pt-12 lg:pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Create your own virtual exhibition from world-leading collections.
            </h1>
            <p className="text-base text-slate-200 sm:text-lg">
              Search from world-renowned collections, create a narrative, and
              present your exhibition in your own digital space.
            </p>
          </div>

          <div className="relative mx-auto max-w-sm rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_24px_60px_-25px_rgba(99,102,241,0.45)] backdrop-blur">
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
                  Share your exhibition with collaborators or the public
                  instantly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
