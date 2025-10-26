import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getCategoryLabel } from '../data/loreStructure'
import './LorePage.css'

function LorePage() {
  const { category, page } = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/Eidolon_Lore/lore/${category}/${page}.md`)

        if (!response.ok) {
          throw new Error('Page not found')
        }

        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMarkdown()
  }, [category, page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category, page])

  if (loading) {
    return (
      <div className="lore-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading lore...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="lore-page">
        <div className="error-container glass">
          <h2>⚠️ Page Not Found</h2>
          <p>{error}</p>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="lore-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <span className="category">{getCategoryLabel(category)}</span>
      </nav>

      <article className="lore-article glass">
        <MarkdownRenderer content={content} />
      </article>

      <div className="page-footer">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default LorePage
