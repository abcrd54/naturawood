import { Routes, Route } from 'react-router-dom'
import NaturawoodWebsite from './pages/NaturawoodWebsite'
import AdminPanelPage from './pages/AdminPanelPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NaturawoodWebsite />} />
      <Route path="/admin-panel" element={<AdminPanelPage />} />
    </Routes>
  )
}

export default App
