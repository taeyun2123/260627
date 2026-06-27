import React from 'react';
import { useAuth } from '../context/AuthContext';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

export default function Dashboard() {
  const { currentUser, userRole, logout } = useAuth();

  return (
    <div>
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <span className="text-body-lg" style={{ fontWeight: '700' }}>EduApp Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="text-body-sm">{currentUser?.displayName}</span>
          <button className="btn-secondary" onClick={logout} style={{ padding: '6px 14px' }}>
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
