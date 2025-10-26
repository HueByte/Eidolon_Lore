import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar glass">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Eidolon Line</span>
        </Link>

        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
