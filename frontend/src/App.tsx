import "./App.css";
import { useState, useEffect } from "react";
import SearchSection from "./components/SearchSection";
import ExhibitionSection from "./components/ExhibitionSection";
import type { Artwork } from "./types/artwork";
import ExhibitionNameForm from "./components/ExhibitionNameForm";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { useAppUser } from "./components/UserProvider";
import Header from "./components/Header";
import LandingHero from "./components/LandingHero";

const localStorageKey = "exhibition_curator";

function App() {
  const [exhibition, setExhibition] = useState<Artwork[]>([]);
  const [exhibitionName, setExhibitionName] = useState<string>("");
  const [exhibitionDescription, setExhibitionDescription] =
    useState<string>("");
  const [exhibitionNotes, setExhibitionNotes] = useState<string>("");
  const [hasCreatedExhibition, setHasCreatedExhibition] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCreateCollapsed, setIsCreateCollapsed] = useState(false);

  const { user } = useAppUser();

  const addToExhibition = (artwork: Artwork) => {
    setExhibition((prev) => {
      if (prev.some((item) => item.id === artwork.id)) return prev;
      return [...prev, artwork];
    });
  };

  const removeFromExhibition = (artwork: Artwork) => {
    setExhibition((prev) => prev.filter((item) => item.id !== artwork.id));
  };

  const clearExhibition = () => {
    setExhibition([]);
    setExhibitionName("");
    setExhibitionDescription("");
    setExhibitionNotes("");
    setHasCreatedExhibition(false);
    setIsCreateCollapsed(false);
    localStorage.removeItem(localStorageKey);
  };

  useEffect(() => {
    try {
      const storedExhibition = localStorage.getItem(localStorageKey);
      if (!storedExhibition) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(storedExhibition);
      if (!parsed || typeof parsed !== "object") {
        setIsHydrated(true);
        return;
      }

      if (Array.isArray(parsed.exhibition)) setExhibition(parsed.exhibition);
      if (typeof parsed.exhibitionName === "string")
        setExhibitionName(parsed.exhibitionName);
      if (typeof parsed.exhibitionDescription === "string")
        setExhibitionDescription(parsed.exhibitionDescription);
      if (typeof parsed.exhibitionNotes === "string")
        setExhibitionNotes(parsed.exhibitionNotes);
      if (typeof parsed.hasCreatedExhibition === "boolean")
        setHasCreatedExhibition(parsed.hasCreatedExhibition);
      if (typeof parsed.isCreateCollapsed === "boolean")
        setIsCreateCollapsed(parsed.isCreateCollapsed);
    } catch (error) {
      console.error("Error loading exhibition from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          exhibition,
          exhibitionName,
          exhibitionDescription,
          exhibitionNotes,
          hasCreatedExhibition,
          isCreateCollapsed,
        })
      );
    } catch (error) {
      console.error("Error saving exhibition to localStorage:", error);
    }
  }, [
    isHydrated,
    exhibition,
    exhibitionName,
    exhibitionDescription,
    exhibitionNotes,
    hasCreatedExhibition,
    isCreateCollapsed,
  ]);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="app min-h-screen bg-gradient-to-b from-[#030711] via-[#050a1f] to-[#090f2e] text-white">
      <Header />
      <LandingHero hasCreatedExhibition={hasCreatedExhibition} />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 space-y-12">
        <ExhibitionNameForm
          exhibitionName={exhibitionName}
          setExhibitionName={setExhibitionName}
          exhibitionDescription={exhibitionDescription}
          setExhibitionDescription={setExhibitionDescription}
          exhibitionNotes={exhibitionNotes}
          setExhibitionNotes={setExhibitionNotes}
          onCreate={() => {
            setHasCreatedExhibition(true);
            setIsCreateCollapsed(true);
          }}
          variant="compact"
          collapsed={isCreateCollapsed}
          onExpandToggle={() => setIsCreateCollapsed((prev) => !prev)}
        />

        <section className="space-y-8">
          {hasCreatedExhibition && (
            <ExhibitionSection
              exhibition={exhibition}
              exhibitionName={exhibitionName}
              exhibitionDescription={exhibitionDescription}
              exhibitionNotes={exhibitionNotes}
              removeFromExhibition={removeFromExhibition}
              onClearExhibition={clearExhibition}
            />
          )}

          {hasCreatedExhibition && (
            <div className="space-y-8">
              <SearchSection
                pageSize={20}
                addToExhibition={addToExhibition}
                removeFromExhibition={removeFromExhibition}
                exhibition={exhibition}
              />
            </div>
          )}

          <SignedOut>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center text-sm text-slate-200/80 shadow-[0_20px_60px_-25px_rgba(99,102,241,0.5)]">
              Sign in to save your selections, collaborate in real-time, and publish immersive showcases.
            </div>
          </SignedOut>
          <SignedIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 shadow-[0_20px_60px_-25px_rgba(99,102,241,0.5)]">
              <h2 className="text-3xl font-semibold text-white">
                Welcome back, {user?.firstName}
              </h2>
              <p className="mt-2 text-sm text-slate-200/80">
                Continue curating and refining your exhibition, and share your vision.
              </p>
            </div>
          </SignedIn>
        </section>
      </main>
    </div>
  );
}

export default App;
