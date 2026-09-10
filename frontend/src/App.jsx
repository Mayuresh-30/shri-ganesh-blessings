
import { RouterProvider } from 'react-router-dom'
import router from './routing/router.jsx'
import PersistentAudio from './components/PersistentAudio.jsx'

function App() {
  return (
    <>
      <PersistentAudio />
      <RouterProvider router={router} />
    </>
  )
}

export default App
