import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content glass">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for has drifted into the void.</p>
        <blockquote>
          "In the endless dark, not all paths lead home." — Eidolon
        </blockquote>
        <Link to="/" className="home-button">
          Return to the Line
        </Link>
      </div>
    </div>
  )
}

export default NotFound
