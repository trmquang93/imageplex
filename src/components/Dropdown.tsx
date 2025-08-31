import React, { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: '24px', position: 'relative' }}>
      <div style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#202124',
        marginBottom: '8px',
        textAlign: 'left'
      }}>
        {label}
      </div>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px 16px',
          backgroundColor: isOpen ? '#faf8ff' : '#f8f9fa',
          border: `1px solid ${isOpen ? '#9c27b0' : '#dadce0'}`,
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: '#202124',
          transition: 'all 0.2s ease'
        }}
      >
        <span>{selectedOption?.label || 'Select option'}</span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          color: '#5f6368'
        }}>
          ▼
        </span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #dadce0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 10,
          marginTop: '4px'
        }}>
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#202124',
                backgroundColor: option.value === value ? '#f3e5f5' : 'transparent',
                transition: 'background-color 0.1s ease',
                ...(index === 0 && { borderRadius: '8px 8px 0 0' }),
                ...(index === options.length - 1 && { borderRadius: '0 0 8px 8px' })
              }}
              onMouseEnter={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      
      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Dropdown;