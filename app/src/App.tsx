import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Pages/Login/Login'
import Signup from './components/Pages/Signup/Signup'
import Dashboard from './components/Pages/Dashboard/Dashboard'
import Variable from './components/Pages/Variable/Variable'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/variable" element={<Variable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
