import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  leftLabel: string;
  rightLabel: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  leftLabel,
  rightLabel,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#202124',
        marginBottom: '12px',
        textAlign: 'left'
      }}>
        {label}
      </div>
      
      <div style={{
        position: 'relative',
        marginBottom: '8px'
      }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: `linear-gradient(to right, #9c27b0 0%, #9c27b0 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`,
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer'
          }}
        />
        <style>
          {`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #9c27b0;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(156, 39, 176, 0.3);
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #9c27b0;
              cursor: pointer;
              border: none;
              box-shadow: 0 2px 8px rgba(156, 39, 176, 0.3);
            }
          `}
        </style>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#5f6368'
      }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};

export default Slider;