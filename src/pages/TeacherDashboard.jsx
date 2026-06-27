import React, { useState, useEffect } from 'react';

export default function TeacherDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    minTime: '3',
    question: ''
  });

  const [currentApp, setCurrentApp] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('currentLearningApp');
    if (saved) {
      setCurrentApp(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      alert("앱 이름과 URL은 필수입니다.");
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('currentLearningApp', JSON.stringify(formData));
    setCurrentApp(formData);
    
    alert("학습 앱이 학생들에게 배포되었습니다!");
    setFormData({ title: '', url: '', minTime: '3', question: '' });
  };

  return (
    <div>
      <div className="color-block-section color-block-lime">
        <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Teacher Workspace</div>
        <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>새로운 학습 앱 등록</h2>
        
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', backgroundColor: 'var(--canvas)', padding: 'var(--spacing-lg)', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--hairline)' }}>
          <div className="form-group">
            <label className="form-label">앱 이름 (App Title)</label>
            <input 
              type="text" 
              name="title"
              className="text-input" 
              placeholder="예: 한자 성조 연습기" 
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">앱 주소 (Target URL)</label>
            <input 
              type="url" 
              name="url"
              className="text-input" 
              placeholder="https://..." 
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">최소 학습 시간 (분)</label>
            <input 
              type="number" 
              name="minTime"
              className="text-input" 
              min="1"
              max="60"
              value={formData.minTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label className="form-label">학습 완료 검증 질문 (한 줄)</label>
            <input 
              type="text" 
              name="question"
              className="text-input" 
              placeholder="예: 오늘 배운 핵심 단어의 뜻을 쓰세요." 
              value={formData.question}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            이 링크로 학생들에게 배포하기
          </button>
        </form>
      </div>

      <div className="spacer-section"></div>

      {currentApp && (
        <div className="color-block-section color-block-navy">
          <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Live Dashboard</div>
          <h2 className="text-display-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>현재 배포된 앱</h2>
          
          <div style={{ backgroundColor: 'var(--canvas)', color: 'var(--ink)', padding: 'var(--spacing-lg)', borderRadius: 'var(--rounded-lg)', maxWidth: '600px' }}>
            <h3 className="text-card-title">{currentApp.title}</h3>
            <p className="text-body" style={{ color: 'var(--primary)' }}>{currentApp.url}</p>
            <div style={{ marginTop: 'var(--spacing-md)', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
              <p>최소 학습: {currentApp.minTime}분</p>
              <p>검증 질문: {currentApp.question || '없음'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
