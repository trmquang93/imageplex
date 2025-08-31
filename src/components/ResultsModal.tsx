import React from 'react';
import { useTranslation } from '../i18n';

interface ResultsModalProps {
  isVisible: boolean;
  originalImageUrl: string | null;
  processedImageUrl: string | null;
  feature: string | null;
  onClose: () => void;
  onDownload: () => void;
  onUseAsNew: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isVisible,
  originalImageUrl,
  processedImageUrl,
  feature,
  onClose,
  onDownload,
  onUseAsNew
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
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: featureInfo.color,
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {featureInfo.icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#202124',
                margin: '0 0 4px 0'
              }}>
                {featureInfo.name} {t('results.title')}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#5f6368',
                margin: '0'
              }}>
                {t('processing.complete')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#5f6368',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              lineHeight: '1'
            }}
          >
            ✕
          </button>
        </div>

        {/* Image Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Original Image */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#202124',
              margin: '0 0 12px 0'
            }}>
              {t('results.original')}
            </h4>
            <div style={{
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa'
            }}>
              {originalImageUrl ? (
                <img
                  src={originalImageUrl}
                  alt="Original"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <span style={{ color: '#9aa0a6' }}>No image</span>
              )}
            </div>
          </div>

          {/* Processed Image */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#202124',
              margin: '0 0 12px 0'
            }}>
              {t('results.processed')}
            </h4>
            <div style={{
              border: `2px solid ${featureInfo.color}`,
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa'
            }}>
              {processedImageUrl ? (
                <img
                  src={processedImageUrl}
                  alt="Processed"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <span style={{ color: '#9aa0a6' }}>No processed image</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onDownload}
            style={{
              backgroundColor: featureInfo.color,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📥 {t('results.download')}
          </button>
          <button
            onClick={onUseAsNew}
            style={{
              backgroundColor: 'white',
              color: featureInfo.color,
              border: `2px solid ${featureInfo.color}`,
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🔄 {t('results.useAsNew')}
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#f8f9fa',
              color: '#5f6368',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {t('results.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;