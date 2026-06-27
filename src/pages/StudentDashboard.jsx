import React, { useState, useEffect } from 'react';

export default function StudentDashboard() {
  const [currentApp, setCurrentApp] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('currentLearningApp');
    if (saved) {
      setCurrentApp(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <div className="color-block-section color-block-cream">
        <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Student Portal</div>
        <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-md)' }}>오늘의 학습 앱</h2>
        
        {currentApp ? (
          <div>
            <p className="text-subhead" style={{ maxWidth: '600px', marginBottom: 'var(--spacing-lg)' }}>
              선생님이 새 학습 링크를 지정했습니다.
            </p>
            
            <div style={{ backgroundColor: 'var(--canvas)', padding: 'var(--spacing-lg)', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--hairline)', maxWidth: '600px' }}>
              <h3 className="text-card-title">{currentApp.title}</h3>
              <p className="text-body" style={{ marginBottom: 'var(--spacing-md)' }}>
                이 앱은 최소 {currentApp.minTime}분 이상 학습해야 제출이 가능합니다.
              </p>
              
              <a href={currentApp.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-block' }}>
                학습 시작
              </a>
            </div>
          </div>
        ) : (
          <p className="text-subhead" style={{ maxWidth: '600px' }}>
            아직 선생님이 등록한 오늘의 학습 앱이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
