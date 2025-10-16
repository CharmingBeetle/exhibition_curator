import { useState } from "react";
import Navbar from "./Navbar";
import logoWhite from "../assets/logo-white.png";
import { Bars3Icon } from "@heroicons/react/24/solid";

type HeaderProps = {
  onNavigate?: (href: string) => void;
};

const Header = ({ onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-black/95 via-[#]/90 to-[#050a1f]/75 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
        <div className="flex flex-col gap-1">
          <a
            href="#home"
            className="inline-flex items-center"
            onClick={() => {
              onNavigate?.("#home");
            }}
          >
            <img
              src={logoWhite}
              alt="Assemblé logo"
              className="h-40 w-auto drop-shadow-[0_0_25px_rgba(148,163,255,0.35)]"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="header-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            isOpen
              ? "bg-indigo-500/30 hover:bg-indigo-500/20"
              : "bg-white/10 hover:border-indigo-400/60 hover:bg-indigo-500/20"
          }`}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onNavigate={(href) => {
          onNavigate?.(href);
        }}
      />
    </header>
  );
};

export default Header;
