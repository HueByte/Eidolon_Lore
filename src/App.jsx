import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LorePage from './pages/LorePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router basename="/Eidolon_Lore">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lore/:category/:page" element={<LorePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
