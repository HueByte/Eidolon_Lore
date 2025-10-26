import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import './MermaidDiagram.css'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#38bdf8',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#0ea5e9',
    lineColor: '#38bdf8',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    background: '#0f172a',
    mainBkg: '#1e293b',
    secondBkg: '#0f172a',
    textColor: '#e2e8f0',
    border1: '#38bdf8',
    border2: '#0ea5e9',
    fontSize: '16px',
  },
})

function MermaidDiagram({ chart }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      try {
        mermaid.render(`mermaid-${Date.now()}`, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg
          }
        })
      } catch (error) {
        console.error('Mermaid rendering error:', error)
        if (ref.current) {
          ref.current.innerHTML = `<div class="mermaid-error">Failed to render diagram</div>`
        }
      }
    }
  }, [chart])

  return <div className="mermaid-container" ref={ref}></div>
}

export default MermaidDiagram
