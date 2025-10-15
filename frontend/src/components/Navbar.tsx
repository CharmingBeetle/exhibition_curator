import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import {
  ChevronRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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

  return (
    <div
      id="header-navigation"
      className={`overflow-hidden border-t border-white/5 transition-[max-height,opacity] duration-500 ease-in-out ${
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
              onClick={(event) => {
                setIsOpen(false);
                onNavigate?.(href);
              }}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/80 hover:bg-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-indigo-200 transition group-hover:bg-indigo-500/20 group-hover:text-indigo-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{label}</span>
                  <span className="text-xs text-slate-300/80">{description}</span>
                </span>
              </span>
              <ChevronRightIcon className="h-4 w-4 text-indigo-200 transition group-hover:translate-x-1 group-hover:text-indigo-100" />
            </a>
          ))}
        </nav>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4 text-sm text-indigo-100/90 shadow-[0_18px_35px_-20px_rgba(99,102,241,0.55)]">
            <h3 className="text-sm font-semibold text-white">New to Assemblé?</h3>
            <p className="mt-1 text-xs text-indigo-100/80">
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
              <div className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white">
                You’re signed in
              </div>
            </SignedIn>
          </div>

          <SignedIn>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut({ redirectUrl: "/" });
              }}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Sign out
            </button>
          </SignedIn>
        </div>

        <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
          © {new Date().getFullYear()} Assemblé
        </div>
      </div>
    </div>
  );
}

export default Navbar;
