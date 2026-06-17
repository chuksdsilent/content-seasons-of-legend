import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoutes.jsx'
import Users from './pages/Users.jsx'
import About from './pages/about.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          }
        /><Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
