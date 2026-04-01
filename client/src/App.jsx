import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import MyInterviews from './pages/MyInterviews'
import PracticeResource from './pages/PracticeResource'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyProfile from './pages/MyProfile'

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-interviews" element={<MyInterviews />} />
            <Route path="/practice" element={<PracticeResource />} />
            <Route path="/profile" element={<MyProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
