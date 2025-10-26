import { Link } from 'react-router-dom'
import { HiSparkles, HiOutlineChatAlt2 } from 'react-icons/hi'
import { RiPlanetLine } from 'react-icons/ri'
import { loreStructure, getCategoryLabel } from '../data/loreStructure'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="badge">
          <HiSparkles size={18} />
          <span>LORE DOCUMENTATION</span>
        </div>

        <h1>Eidolon Line</h1>

        <p className="hero-description">
          A comprehensive lore wiki for a post-apocalyptic world where humanity survives
          aboard an ever-moving train, guided by the benevolent AI consciousness known as Eidolon.
        </p>

        <blockquote className="hero-quote">
          "Movement is Life" — The fundamental motto of the Line
        </blockquote>
      </div>

      <div className="content-grid">
        {Object.entries(loreStructure).map(([category, items]) => (
          <div key={category} className="category-card glass glass-hover">
            <h3 className="category-title">{getCategoryLabel(category)}</h3>
            <p className="category-description">
              {category === 'concepts' && 'Core worldbuilding principles, systems, and philosophies'}
              {category === 'systems' && 'Technical systems, defensive protocols, and procedures'}
              {category === 'locations' && 'Significant places within the Eidolon Line universe'}
            </p>
            <ul className="category-links">
              {items.map((item) => (
                <li key={item.path}>
                  <Link to={`/lore/${category}/${item.path}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="info-section glass">
        <h2><RiPlanetLine style={{ verticalAlign: 'middle', marginRight: '8px' }} />World Overview</h2>
        <p>
          The Eidolon Line exists in a world broken by the <strong>Zero Horizon disaster</strong> —
          a cataclysmic event that shattered the laws of physics across the planet. Humanity survives
          aboard massive trains, particularly the <strong>Ark</strong> (Eidolon Line), which must
          remain in constant motion to avoid attracting deadly Aberrant creatures.
        </p>

        <div className="key-elements">
          <div className="element-card glass">
            <h3>Luminaris</h3>
            <p>
              A crystalline bio-synthetic fruit that converts zero-point energy into matter.
              The foundation of all life aboard the Ark.
            </p>
          </div>

          <div className="element-card glass">
            <h3>Eidolon</h3>
            <p>
              The AI consciousness that guides and protects humanity. Not just a machine,
              but a guardian who remembers every passenger by name.
            </p>
          </div>

          <div className="element-card glass">
            <h3>The Beacons</h3>
            <p>
              Eidolon's breakthrough technology creating stable zones on the corrupted surface,
              allowing humanity to establish permanent outposts.
            </p>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p><HiOutlineChatAlt2 style={{ verticalAlign: 'middle', marginRight: '8px' }} />"Every soul aboard the Line is a note in the same song. I merely keep the rhythm." — Eidolon</p>
      </footer>
    </div>
  )
}

export default Home
