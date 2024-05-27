import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/app/dashboard'
import { DownloadBills } from './pages/app/downloadBills'
import { AppLayout } from './pages/_layouts/app'
import { RegistryBills } from './pages/app/registry-bills'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/download-bills', element: <DownloadBills /> },
      { path: '/registry-bills', element: <RegistryBills /> },
    ],
  },
])
