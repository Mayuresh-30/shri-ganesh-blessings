import { createBrowserRouter } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import GaneshPage from '../pages/GaneshPage'
import BlessingPage from '../pages/BlessingPage'
import NotFoundPage from '../pages/NotFoundPage'
import AppLayout from '../components/AppLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'ganesh', element: <GaneshPage /> },
      { path: 'blessings', element: <BlessingPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router