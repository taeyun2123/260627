import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleSelection() {
  const navigate = useNavigate();
  const { currentUser, userRole, selectRole } = useAuth();

  useEffect(() => {
    // 화면 진입 시 무조건 역할 초기화 (뒤로가기 대응)
    selectRole(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSelectRole = (role) => {
    selectRole(role);
    navigate('/dashboard');
  };

  return (
    <div>
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <span className="text-body-lg" style={{ fontWeight: '700' }}>EduApp Hub</span>
        </div>
      </nav>

      <div className="container" style={{ marginTop: 'var(--spacing-xxl)' }}>
        <div className="color-block-section color-block-lime" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Onboarding</div>
          <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>역할을 선택해주세요</h2>
          <p className="text-subhead" style={{ marginBottom: 'var(--spacing-xxl)' }}>
            원활한 맞춤형 환경 제공을 위해 역할 구분이 필요합니다.
          </p>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button className="btn-primary" onClick={() => handleSelectRole('student')}>
              학생 (Student)
            </button>
            <button className="btn-secondary" onClick={() => handleSelectRole('teacher')}>
              교사 (Teacher)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
