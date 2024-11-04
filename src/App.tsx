import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Layout from './components/Layouts/Layout'
import Staff from './pages/Employees/Employees'
import Profile from './pages/Profile/Profile'
import Team from './pages/Team/Team'
import AuthLayout from './components/Layouts/AuthLayout'
import Login from './pages/Auth/Login'
import RequestOtp from './pages/Auth/RequestOtp'
import Events from './pages/Events/Events'
import ProtectedRoute from './components/Layouts/ProtectedRoute'
import AddEmployee from './pages/Employees/AddEmployee'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout/>}>
        <Route index element={<Login />} />
        <Route path="request-otp" element={<RequestOtp />} />
      </Route>
      <Route path='/' element={<ProtectedRoute children={<Layout/>}/>}>
        <Route path='addEmployee' element={<AddEmployee/>}/>
        <Route path='employees' element={<Staff/>}/>
        <Route path='employees/:id' element={<Profile/>}/>
        <Route path='team' element={<Team/>}/>
        <Route path='events' element={<Events/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default App
