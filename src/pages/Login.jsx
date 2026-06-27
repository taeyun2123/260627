import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, X } from 'lucide-react';
import ethicsGuideImage from '../assets/중학교_AI윤리가이드.png';

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, loginAsGuest, logout } = useAuth();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (currentUser) {
      logout();
    }
  }, [currentUser, logout]);

  const handleLogin = () => {
    try {
      loginAsGuest();
      navigate('/select-role');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <span className="text-body-lg" style={{ fontWeight: '700' }}>EduApp Hub</span>
        </div>
      </nav>

      <div className="container" style={{ marginTop: 'var(--spacing-xxl)' }}>
        <div className="color-block-section color-block-lilac" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="text-eyebrow" style={{ marginBottom: 'var(--spacing-md)' }}>Portal Login</div>
          <h1 className="text-display-xl" style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '800px' }}>
            수업에 집중하는 가장 가벼운 방법.
          </h1>
          <p className="text-subhead" style={{ marginBottom: 'var(--spacing-xxl)', maxWidth: '600px' }}>
            디봇(크롬북, 웨일북) 환경에 최적화된 초경량 포털입니다. 복잡한 과정 없이 구글 계정으로 바로 시작하세요.
          </p>
          
          <button className="btn-primary" onClick={handleLogin} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={20} />
            포털 시작하기 (로그인 생략)
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
              <h2 className="text-card-title">중학교 AI 윤리 가이드</h2>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px' }}>
                <X size={24} color="var(--ink)" />
              </button>
            </div>
            <img 
              src={ethicsGuideImage} 
              alt="중학교 AI 윤리 가이드" 
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--rounded-md)', marginBottom: 'var(--spacing-lg)' }} 
            />
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
              setShowModal(false);
              handleLogin();
            }}>
              확인했습니다 (포털 시작하기)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
