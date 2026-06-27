import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // 역할(Role) 선택 함수 (학생 또는 교사)
  const selectRole = (role) => {
    setUserRole(role);
  };

  const loginAsGuest = () => {
    const user = { uid: 'guest_' + Math.random().toString(36).substring(7), displayName: '익명 사용자' };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    selectRole,
    loginAsGuest,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
