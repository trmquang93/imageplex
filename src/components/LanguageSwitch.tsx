import React from 'react';
import { useI18n } from '../i18n';
import type { Language } from '../i18n/types';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      <span style={{
        fontSize: '14px',
        color: '#5f6368',
        marginRight: '8px',
        fontWeight: '500'
      }}>
        {t('common.language')}:
      </span>
      
      <button
        onClick={() => handleLanguageChange('en')}
        style={{
          backgroundColor: language === 'en' ? '#9c27b0' : 'transparent',
          color: language === 'en' ? 'white' : '#5f6368',
          border: 'none',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        🇺🇸 EN
      </button>
      
      <button
        onClick={() => handleLanguageChange('vi')}
        style={{
          backgroundColor: language === 'vi' ? '#9c27b0' : 'transparent',
          color: language === 'vi' ? 'white' : '#5f6368',
          border: 'none',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        🇻🇳 VI
      </button>
    </div>
  );
};

export default LanguageSwitch;