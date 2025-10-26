import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import Home from '../pages/Home'
import LorePage from '../pages/LorePage'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'lore/:category/:page',
        element: <LorePage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
], {
  basename: '/Eidolon_Lore'
})

export function AppRouter() {
  return <RouterProvider router={router} />
}

export default router
