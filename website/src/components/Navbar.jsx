import { Link } from 'react-router-dom'
import { HiOutlineMenu } from 'react-icons/hi'
import { GiRailway } from 'react-icons/gi'
import './Navbar.css'

function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar glass">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <GiRailway className="brand-icon" />
          <span className="brand-text">Eidolon Line</span>
        </Link>

        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <HiOutlineMenu size={24} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
