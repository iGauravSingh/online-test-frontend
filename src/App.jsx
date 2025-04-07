import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Dashboard from './components/Dashboard'
import OnlineTest from './components/OnlineTest'
import AdminLogin from './components/Login'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: renders OnlineTest */}
        <Route path="/" element={<OnlineTest />} />

        {/* Login route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
