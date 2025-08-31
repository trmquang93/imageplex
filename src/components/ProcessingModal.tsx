import React from 'react';
import { useTranslation } from '../i18n';

interface ProcessingModalProps {
  isVisible: boolean;
  feature: string | null;
  progress: number;
  status: string;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isVisible,
  feature,
  progress,
  status
}) => {
  const { t } = useTranslation();
  
  if (!isVisible) return null;

  const getFeatureInfo = (feature: string | null) => {
    switch (feature) {
      case 'resize':
        return { icon: '⚡', name: t('features.resize.title'), color: '#4285f4' };
      case 'coloring':
        return { icon: '🎨', name: t('features.coloring.title'), color: '#9c27b0' };
      case 'lineArt':
        return { icon: '✏️', name: t('features.lineArt.title'), color: '#ff6f00' };
      default:
        return { icon: '🔄', name: t('common.loading'), color: '#4285f4' };
    }
  };

  const featureInfo = getFeatureInfo(feature);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Feature Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: featureInfo.color,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px'
        }}>
          {featureInfo.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#202124',
          margin: '0 0 12px 0'
        }}>
          {featureInfo.name}
        </h3>

        {/* Status */}
        <p style={{
          fontSize: '16px',
          color: '#5f6368',
          margin: '0 0 32px 0'
        }}>
          {status}
        </p>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: featureInfo.color,
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Progress Percentage */}
        <p style={{
          fontSize: '14px',
          color: '#5f6368',
          margin: '0'
        }}>
          {Math.round(progress)}% complete
        </p>

        {/* Animated Loading Dots */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: featureInfo.color,
                borderRadius: '50%',
                animation: `pulse 1.4s ease-in-out ${i * 0.16}s infinite both`
              }}
            />
          ))}
        </div>

        <style>
          {`
            @keyframes pulse {
              0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
              }
              40% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ProcessingModal;