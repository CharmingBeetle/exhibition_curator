import logoWhite from '../assets/logo-white.png'
import { SignedOut, SignedIn, SignInButton, UserButton, useClerk } from '@clerk/clerk-react'

type NavbarProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

function Navbar(
    { isOpen, setIsOpen }: NavbarProps) {
    const { signOut } = useClerk();

    return (
        <>
            {isOpen && (
                <div className="side-navbar__overlay" onClick={() => setIsOpen(false)} />
            )}

            <nav
                id="side-navigation"
                className={`side-navbar ${isOpen ? 'side-navbar-open' : ''}`}

            >

                <button
                    type="button"
                    onClick={() => setIsOpen(false)} aria-label="Close menu"
                > Close
                </button>

                <img src={logoWhite} alt="Assemblé logo"
                    height={150}
                    width={150}
                />

                <ul className='side-navbar-list'>
                    <li ><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#search" onClick={() => setIsOpen(false)}>Search</a></li>
                    <li><a href="#exhibition" onClick={() => setIsOpen(false)}>My Exhibition</a></li>
                    <li><a href="#profile" onClick={() => setIsOpen(false)}>Profile</a></li>
                    <li>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <span>Sign in</span>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        labelIcon={null}
                                        label="Sign out"
                                        onClick={() => signOut({ redirectUrl: '/' })}
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        </SignedIn>
                    </li>

                </ul>
            </nav>
        </>
    )
}


export default Navbar