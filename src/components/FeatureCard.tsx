import React from 'react';
import Slider from './Slider';
import Dropdown from './Dropdown';
import { useTranslation } from '../i18n';
import type { ConfigSchema, FeatureConfig } from '../types/processing';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  backgroundColor: string;
  selectedColor: string;
  isSelected: boolean;
  onSelect: () => void;
  config?: FeatureConfig;
  configSchema?: ConfigSchema;
  onConfigChange?: (key: string, value: string | number) => void;
  uploadedImage?: string | null;
  uploadedFile?: File | null;
  onProcessWithFeature?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  features,
  backgroundColor,
  selectedColor,
  isSelected,
  onSelect,
  config,
  configSchema,
  onConfigChange,
  uploadedImage,
  uploadedFile,
  onProcessWithFeature
}) => {
  const { t } = useTranslation();
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef',
      textAlign: 'center',
      position: 'relative',
      transition: 'all 0.3s ease',
      minHeight: isSelected ? '500px' : '400px'
    }}>
      {/* Header Section */}
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: backgroundColor,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: '32px'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#202124',
        margin: '0 0 12px 0'
      }}>
        {title}
      </h3>
      
      {!isSelected && (
        <>
          <p style={{
            fontSize: '16px',
            color: '#5f6368',
            lineHeight: '1.5',
            margin: '0 0 24px 0'
          }}>
            {description}
          </p>
          
          <div style={{
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#5f6368'
              }}>
                <span style={{ color: '#34a853', marginRight: '8px' }}>✓</span>
                {feature}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Image Preview - Only shown when selected and image exists */}
      {isSelected && uploadedImage && (
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <img
            src={uploadedImage}
            alt="Preview"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #e9ecef'
            }}
          />
        </div>
      )}

      {/* Configuration Section - Only shown when selected */}
      {isSelected && config && configSchema && onConfigChange && (
        <div style={{
          textAlign: 'left',
          marginBottom: '24px',
          paddingTop: uploadedImage ? '0' : '20px',
          borderTop: uploadedImage ? 'none' : '1px solid #e9ecef'
        }}>
          {/* Dropdown configurations */}
          {configSchema.dropdowns.map((dropdown) => (
            <Dropdown
              key={dropdown.key}
              label={dropdown.label}
              value={(config as any)[dropdown.key] || ''}
              options={dropdown.options}
              onChange={(value) => onConfigChange(dropdown.key, value)}
            />
          ))}
          
          {/* Slider configurations */}
          {configSchema.sliders.map((slider) => (
            <Slider
              key={slider.key}
              label={slider.label}
              value={(config as any)[slider.key] || slider.min}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              leftLabel={slider.leftLabel}
              rightLabel={slider.rightLabel}
              onChange={(value) => onConfigChange(slider.key, value)}
            />
          ))}
        </div>
      )}
      
      {/* Selection Button - Only shown when not selected */}
      {!isSelected && (
        <button
          onClick={onSelect}
          style={{
            backgroundColor: backgroundColor,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
            marginTop: 'auto'
          }}
        >
          {t('features.buttons.select')} {title}
        </button>
      )}

      {/* Action Buttons - Only shown when selected */}
      {isSelected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Process Button - Only enabled when image is uploaded */}
          {uploadedFile && onProcessWithFeature ? (
            <button
              onClick={onProcessWithFeature}
              style={{
                backgroundColor: '#34a853',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
            >
              {t('features.buttons.processWith')} {title}
            </button>
          ) : (
            <button
              disabled
              style={{
                backgroundColor: '#e9ecef',
                color: '#5f6368',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'not-allowed',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
            >
              {t('features.buttons.uploadFirst')}
            </button>
          )}
          
          {/* Change Selection Button */}
          <button
            onClick={onSelect}
            style={{
              backgroundColor: 'transparent',
              color: selectedColor,
              border: `2px solid ${selectedColor}`,
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease'
            }}
          >
            {t('features.buttons.changeSelection')}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;