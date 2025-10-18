import { useState } from "react";
import Navbar from "./Navbar";
import logoOffblack from "../assets/logo-offblack.png";
import { Bars3Icon } from "@heroicons/react/24/solid";

type HeaderProps = {
  onNavigate?: (href: string) => void;
};

const Header = ({ onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#89A8B2]/20 bg-gradient-to-b from-[#F1F0E8]/60 via-[#E5E1DA]/50 to-[#B3C8CF]/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex flex-col gap-1">
          <a
            href="#home"
            className="inline-flex items-center"
            onClick={() => {
              onNavigate?.("#home");
            }}
          >
            <img
              src={logoOffblack}
              alt="Assemblé logo"
              className="h-10 w-auto drop-shadow-[0_0_25px_rgba(148,163,255,0.35)]"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="header-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`inline-flex items-center justify-center rounded-full border border-[#89A8B2]/20 p-2.5 text-[#1b1c17] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#89A8B2] ${
            isOpen
              ? "bg-[#89A8B2]/30 hover:bg-[#89A8B2]/20"
              : "bg-white/10 hover:border-[#89A8B2]/60 hover:bg-[#89A8B2]/20"
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
