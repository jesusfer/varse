import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Pages/Login/Login'
import Signup from './components/Pages/Signup/Signup'
import Keys from './components/Pages/Keys/Keys'
import FirstProject from './components/Pages/FirstProject/FirstProject'
import Dashboard from './components/Pages/Dashboard/Dashboard'
import VariableList from './components/Pages/VariableList/VariableList'
import VariableDetails from './components/Pages/VariableDetails/VariableDetails'
import NotFound from './components/Pages/NotFound/NotFound'
import Account from './components/Pages/Account/Account'
import Admin from './components/Pages/Admin/Admin'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/first-project" element={<FirstProject />} />

          <Route element={<Dashboard />}>
            <Route path="/variable-list" element={<VariableList />} />
            <Route
              path="/variable-details/:variableId"
              element={<VariableDetails />}
            />
            <Route path="/keys" element={<Keys />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
