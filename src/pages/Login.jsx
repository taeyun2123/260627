import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { loginAsGuest } = useAuth();

  const handleLogin = () => {
    try {
      loginAsGuest();
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
    </div>
  );
}
