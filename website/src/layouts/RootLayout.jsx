import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import './RootLayout.css'

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="root-layout">
      <Navbar onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
