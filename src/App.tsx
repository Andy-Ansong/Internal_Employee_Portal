import { Route, Routes } from 'react-router-dom'
import './App.css'
import RequestOtp from './pages/RequestOtp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Layout from './components/Layout'
import Staff from './pages/Staff/Staff'
import Profile from './pages/Profile/Profile'
import Team from './pages/Team/Team'
import Events from './pages/Events/Events'

function App() {
  return (
    <Routes>
      <Route index element={<RequestOtp/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='admindashboard' element={<AdminDashboard/>}/>
        <Route path='staff' element={<Staff/>}/>
        <Route path='team' element={<Team/>}/>
        <Route path='events' element={<Events/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default App
