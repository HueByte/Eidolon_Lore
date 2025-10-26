import { Link, useLocation } from 'react-router-dom'
import { loreStructure } from '../data/loreStructure'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>📚 Lore Index</h2>
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(loreStructure).map(([category, items]) => (
            <div key={category} className="nav-section">
              <h3 className="nav-section-title">
                {category === 'concepts' && '🎯 Core Concepts'}
                {category === 'systems' && '⚙️ Systems'}
                {category === 'locations' && '🏛️ Locations'}
              </h3>
              <ul className="nav-list">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={`/lore/${category}/${item.path}`}
                      className={`nav-link ${isActive(`/lore/${category}/${item.path}`) ? 'active' : ''}`}
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-link" onClick={onClose}>
            🏠 Home
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
