import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Layout from './components/Layout'
import Staff from './pages/Employees/Employees'
import Profile from './pages/Profile/Profile'
import Team from './pages/Team/Team'
import Events from './pages/Events/Events'
import Auth from './pages/Auth/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import Notifications from './pages/Notifications/Notifications'

function App() {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/' element={<ProtectedRoute children={<Layout/>}/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='admindashboard' element={<AdminDashboard/>}/>
        <Route path='employees' element={<Staff/>}/>
        <Route path='team' element={<Team/>}/>
        <Route path='events' element={<Events/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default App
