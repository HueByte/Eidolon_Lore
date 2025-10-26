import { Link, useLocation } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { IoBookOutline, IoHome } from 'react-icons/io5'
import { HiOutlineLightBulb, HiOutlineCog, HiOutlineLocationMarker } from 'react-icons/hi'
import { loreStructure } from '../data/loreStructure'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'concepts':
        return <HiOutlineLightBulb size={18} />
      case 'systems':
        return <HiOutlineCog size={18} />
      case 'locations':
        return <HiOutlineLocationMarker size={18} />
      default:
        return null
    }
  }

  const getCategoryTitle = (category) => {
    switch(category) {
      case 'concepts':
        return 'Core Concepts'
      case 'systems':
        return 'Systems'
      case 'locations':
        return 'Locations'
      default:
        return category
    }
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>
            <IoBookOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Lore Index
          </h2>
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            <IoMdClose size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(loreStructure).map(([category, items]) => (
            <div key={category} className="nav-section">
              <h3 className="nav-section-title">
                {getCategoryIcon(category)}
                <span style={{ marginLeft: '8px' }}>{getCategoryTitle(category)}</span>
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
            <IoHome style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Home
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
