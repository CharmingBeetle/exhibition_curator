import { useState } from 'react'
import Navbar from './Navbar'
import logoWhite from '../assets/logo-white.png'
import menu from '../assets/menu.png'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='site-header'>
      <img
        src={logoWhite}
        alt="Assemblé-logo"
        height={150}
        width={150}
      />
      {/* menu button */}
      <button
      type="button"
        onClick={() => setIsOpen(true)}
        
      >
        <img
          src={menu}
          alt=""
          height={20}
          width={20}
        />
      </button>

      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </header>
  )
}

export default Header