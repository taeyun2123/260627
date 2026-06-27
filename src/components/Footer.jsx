import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import { privacyPolicy, termsOfService } from '../lib/docs';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null); // 'privacy' or 'terms'

  const contentMap = {
    privacy: { title: '개인정보처리방침', text: privacyPolicy },
    terms: { title: '이용약관', text: termsOfService },
  };

  return (
    <>
      <footer style={{
        marginTop: 'auto',
        backgroundColor: 'var(--canvas)',
        padding: 'var(--spacing-xl) var(--spacing-xl)',
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--spacing-lg)',
        borderTop: '1px solid var(--hairline-soft)'
      }}>
        <button 
          className="text-caption" 
          onClick={() => setModalContent('privacy')}
          style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          개인정보처리방침
        </button>
        <button 
          className="text-caption" 
          onClick={() => setModalContent('terms')}
          style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          이용약관
        </button>
      </footer>

      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
              <h2 className="text-card-title">{contentMap[modalContent].title}</h2>
              <button onClick={() => setModalContent(null)} style={{ padding: '8px' }}>
                <X size={24} color="var(--ink)" />
              </button>
            </div>
            <div className="markdown-body" style={{ lineHeight: '1.6', fontSize: '14px' }}>
              <ReactMarkdown>{contentMap[modalContent].text}</ReactMarkdown>
            </div>
            <div style={{ marginTop: 'var(--spacing-lg)' }}>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setModalContent(null)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
