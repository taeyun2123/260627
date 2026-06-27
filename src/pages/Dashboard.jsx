import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    } else if (!userRole) {
      navigate('/select-role', { replace: true });
    }
  }, [currentUser, userRole, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <span className="text-body-lg" style={{ fontWeight: '700' }}>EduApp Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="text-body-sm">{currentUser?.displayName}</span>
          <button className="btn-secondary" onClick={handleLogout} style={{ padding: '6px 14px' }}>
            로그아웃
          </button>
        </div>
      </nav>

      <div className="container" style={{ marginTop: 'var(--spacing-xxl)' }}>
        {userRole === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      </div>
    </div>
  );
}
