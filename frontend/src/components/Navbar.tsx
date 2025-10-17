import {
  SignedOut,
  SignedIn,
  SignInButton,
  useClerk,
} from "@clerk/clerk-react";
import {
  ChevronRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: typeof HomeIcon;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#home",
    description: "Overview & highlights",
    icon: HomeIcon,
  },
  {
    label: "Search",
    href: "#search",
    description: "Find works to curate",
    icon: MagnifyingGlassIcon,
  },
  {
    label: "My Exhibition",
    href: "#exhibition",
    description: "Arrange your selection",
    icon: SparklesIcon,
  },
  {
    label: "Profile",
    href: "#profile",
    description: "Settings & saved shows",
    icon: UserIcon,
  },
];

type NavbarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onNavigate?: (href: string) => void;
};

function Navbar({ isOpen, setIsOpen, onNavigate }: NavbarProps) {
  const { signOut } = useClerk();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={navRef}
      id="header-navigation"
      className={`bg-[#89A8B2]/60 overflow-hidden border-t border-[#1b1c17]/5 transition-[max-height,opacity] duration-500 ease-in-out ${
        isOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6">
        <nav aria-label="Primary navigation" className="grid gap-4 md:grid-cols-2">
          {navItems.map(({ href, label, description, icon: Icon }) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                setIsOpen(false);
                onNavigate?.(href);
              }}
              className="group flex items-center justify-between rounded-2xl border-2 border-[#1b1c17]/30 bg-[#E5E1DA]/80 px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#1b1c17]/60 hover:bg-[#E5E1DA]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#89A8B2]"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b1c17]/10 text-[#1b1c17] transition group-hover:bg-[#1b1c17]/20 group-hover:text-[#1b1c17]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-[#1b1c17]">{label}</span>
                  <span className="text-xs text-[#5A6B73]">{description}</span>
                </span>
              </span>
              <ChevronRightIcon className="h-4 w-4 text-[#1b1c17] transition group-hover:translate-x-1 group-hover:text-[#1b1c17]" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="rounded-2xl border-2 border-[#1b1c17]/30 bg-[#E5E1DA]/80 p-4 text-sm text-[#1b1c17] shadow-[0_18px_35px_-20px_rgba(27,28,23,0.25)]">
            <h3 className="text-sm font-semibold text-[#1b1c17]">New to Assemblé?</h3>
            <p className="mt-1 text-xs text-[#5A6B73]">
              Save exhibitions, invite collaborators, and publish immersive showcases.
            </p>
            <SignedOut>
              <SignInButton mode="modal">
                <span className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 cursor-pointer">
                  Sign in or create account
                </span>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-[#1b1c17]">
                You’re signed in
              </div>
            </SignedIn>
          </div>

          <SignedIn>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#1b1c17]/30 bg-[#E5E1DA] px-4 py-3 text-sm font-semibold text-[#1b1c17] transition hover:border-[#1b1c17]/60 hover:bg-[#E5E1DA]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#89A8B2]"
            >
              Sign out
            </button>
          </SignedIn>
        </div>

        <div className="text-xs uppercase tracking-[0.3em] text-[#5A6B73]">
          © {new Date().getFullYear()} Assemblé
        </div>
      </div>
    </div>
  );
}

export default Navbar;
