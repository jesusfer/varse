import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Pages/Login/Login'
import Signup from './components/Pages/Signup/Signup'
import Variables from './components/Pages/Variables/Variables'
import Keys from './components/Pages/Keys/Keys'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/keys" element={<Keys />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
