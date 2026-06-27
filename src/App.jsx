import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import Dashboard from './pages/Dashboard';

// 인증 가드 컴포넌트
const PrivateRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;
  if (!userRole) return <Navigate to="/select-role" />;
  
  return children;
};

// 권한 확인 컴포넌트
const AppRoutes = () => {
  const { currentUser, userRole } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          currentUser 
            ? (userRole ? <Navigate to="/dashboard" /> : <Navigate to="/select-role" />)
            : <Login />
        } 
      />
      <Route 
        path="/select-role" 
        element={!currentUser ? <Navigate to="/login" /> : (userRole ? <Navigate to="/dashboard" /> : <RoleSelection />)} 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
