import "./App.css";
import { useState, useEffect, useRef } from "react";
import SearchSection from "./components/SearchSection";
import ExhibitionSection from "./components/ExhibitionSection";
import type { Artwork } from "./types/artwork";
import ExhibitionNameForm from "./components/ExhibitionNameForm";
import { SignedOut, SignedIn, SignInButton } from "@clerk/clerk-react";
import { useAppUser } from "./components/UserProvider";
import Header from "./components/Header";
import LandingHero from "./components/LandingHero";
import Footer from "./components/Footer";


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
  const [showHero, setShowHero] = useState(true);
  const [showExhibitionForm, setShowExhibitionForm] = useState(false);
  const signInButtonRef = useRef<HTMLButtonElement>(null);

  const { user, isSignedIn } = useAppUser();

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
    setShowHero(true);
    setShowExhibitionForm(false);
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

  useEffect(() => {
    if (!isSignedIn) {
      clearExhibition();
      setShowHero(true);
    }
  }, [isSignedIn]);

  if (!isHydrated) {
    return null;
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  };
  
  return (
    <div className="app min-h-screen bg-gradient-to-b from-[#89A8B2] via-[#B3C8CF] to-[#E5E1DA] text-[#1b1c17]">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#1b1c17] focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-[#89A8B2]"
      >
        Skip to main content
      </a>
      <a 
        href="#search" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 focus:z-50 focus:bg-white focus:text-[#1b1c17] focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-[#89A8B2]"
      >
        Skip to search
      </a>
      
      <Header
        onNavigate={(href) => {
          if (href === "#home") {
            setShowHero(true);
          } else if (href === "#search") {
            setShowHero(false);
          }
        }}
      />
      
      <SignedOut>
        <SignInButton mode="modal">
          <button ref={signInButtonRef} className="sr-only" aria-hidden="true">
            Hidden sign in button
          </button>
        </SignInButton>
      </SignedOut>
      
      {showHero && (
        <LandingHero
          hasCreatedExhibition={hasCreatedExhibition}
          onShowExhibition={() => {
            setShowHero(false);
            setTimeout(() => {
              scrollTo("exhibition");
            }, 100);
          }}
          onStartExhibition={() => {
            setShowExhibitionForm(true);
            setShowHero(false);
            requestAnimationFrame(() => scrollTo("create"));
          }}
        />
      )}
      <main id="main-content" className="relative z-10 mx-auto max-w-6xl px-6 pt-6 space-y-12" role="main">
        <SignedIn>
          <div className="rounded-2xl border-2 border-[#1b1c17]/20 bg-[#E5E1DA]/90 px-6 py-5 shadow-[0_18px_45px_-25px_rgba(27,28,23,0.25)] backdrop-blur-sm" role="region" aria-label="Welcome message">
            <h2 className="text-2xl font-semibold text-[#1b1c17]">
              Welcome back, {user?.firstName}
            </h2>
            <p className="mt-2 text-sm text-[#5A6B73]">
              Continue curating and refining your exhibition, and share your vision.
            </p>
          </div>
        </SignedIn>

        {showExhibitionForm && (
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
              setShowExhibitionForm(false);
            }}
            variant="default"
            collapsed={false}
          />
        )}

        <section className="space-y-8">
          {hasCreatedExhibition && (
            <ExhibitionSection
              exhibition={exhibition}
              exhibitionName={exhibitionName}
              exhibitionDescription={exhibitionDescription}
              exhibitionNotes={exhibitionNotes}
              removeFromExhibition={removeFromExhibition}
              onClearExhibition={() => {
                clearExhibition();
                setShowHero(true);
              }}
            />
          )}

          {hasCreatedExhibition && (
            <div className="space-y-8">
              <SearchSection
                pageSize={20}
                addToExhibition={addToExhibition}
                removeFromExhibition={removeFromExhibition}
                exhibition={exhibition}
                onEnterSearch={() => setShowHero(false)}
              />
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
