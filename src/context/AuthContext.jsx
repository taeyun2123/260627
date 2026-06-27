import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const [loading, setLoading] = useState(true);

  // 역할(Role) 선택 함수 (학생 또는 교사)
  const selectRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      alert("Firebase 설정이 필요합니다. .env.local 파일을 확인해주세요.");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error", error);
      throw error;
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    selectRole,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
