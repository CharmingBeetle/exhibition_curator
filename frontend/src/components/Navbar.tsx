import logoWhite from '../assets/logo-white.png'

type NavbarProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

function Navbar(
    { isOpen, setIsOpen }: NavbarProps) {

    return (
        <>
        {isOpen && (
               <div className="side-navbar__overlay" onClick={() => setIsOpen(false)} />
            )}
      
            <nav
              id="side-navigation"
              className={`side-navbar ${isOpen ? 'side-navbar-open' : ''}`}
              aria-hidden={!isOpen}
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
                
              <ul>
                <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                <li><a href="#search" onClick={() => setIsOpen(false)}>Search</a></li>
                <li><a href="#exhibition" onClick={() => setIsOpen(false)}>My Exhibition</a></li>
                <li><a href="#profile" onClick={() => setIsOpen(false)}>Profile</a></li>

              </ul>
            </nav>
          </>
        )}
            

export default Navbar