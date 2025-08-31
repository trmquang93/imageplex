import React from 'react';
import Slider from './Slider';
import Dropdown from './Dropdown';
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
  onConfigChange
}) => {
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

      {/* Configuration Section - Only shown when selected */}
      {isSelected && config && configSchema && onConfigChange && (
        <div style={{
          textAlign: 'left',
          marginBottom: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef'
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
      
      <button
        onClick={onSelect}
        style={{
          backgroundColor: isSelected ? selectedColor : backgroundColor,
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
        {isSelected ? '✓ Selected' : `Select ${title}`}
      </button>
    </div>
  );
};

export default FeatureCard;