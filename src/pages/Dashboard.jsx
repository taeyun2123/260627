import React from 'react';
import { useAuth } from '../context/AuthContext';

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
        {userRole === 'teacher' ? (
          <div className="color-block-section color-block-navy">
            <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Teacher Workspace</div>
            <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-md)' }}>실시간 모니터링</h2>
            <p className="text-subhead" style={{ maxWidth: '600px' }}>
              수업 중 학생들의 참여 현황을 '신호등 대시보드'로 모니터링하세요. (준비 중)
            </p>
          </div>
        ) : (
          <div className="color-block-section color-block-cream">
            <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Student Portal</div>
            <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-md)' }}>오늘의 학습 앱</h2>
            <p className="text-subhead" style={{ maxWidth: '600px' }}>
              선생님이 지정한 학습 앱을 시작하세요. 최소 학습 시간 경과 후 제출이 가능합니다. (준비 중)
            </p>
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              <button className="btn-primary">학습 시작</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
