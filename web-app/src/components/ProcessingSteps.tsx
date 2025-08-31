import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';

export interface ProcessingStep {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface ProcessingStepsProps {
  steps: ProcessingStep[];
  selectedSteps: string[];
  onStepToggle: (stepId: string) => void;
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({
  steps,
  selectedSteps,
  onStepToggle
}) => {
  return (
    <div style={ds.mb(8)}>
      {steps.map((step) => (
        <ProcessingStepCard
          key={step.id}
          step={step}
          isSelected={selectedSteps.includes(step.id)}
          onToggle={() => onStepToggle(step.id)}
        />
      ))}
    </div>
  );
};

interface ProcessingStepCardProps {
  step: ProcessingStep;
  isSelected: boolean;
  onToggle: () => void;
}

const ProcessingStepCard: React.FC<ProcessingStepCardProps> = ({
  step,
  isSelected,
  onToggle
}) => {
  return (
    <div
      onClick={onToggle}
      style={utils.combine(
        {
          border: isSelected 
            ? `2px solid ${step.color}` 
            : `1px solid ${tokens.colors.border.light}`,
          background: isSelected
            ? `${step.color}20`
            : tokens.colors.background.tertiary,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        },
        ds.mb(4),
        ds.rounded('2xl'),
        ds.transition('all', 'base', 'smooth'),
        {
          transform: isSelected ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
          boxShadow: isSelected 
            ? '0 8px 25px rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)'
        }
      )}
    >
      {/* Gradient Accent */}
      <div style={utils.combine(
        ds.absolute('0', '0', undefined, '0'),
        {
          height: '4px',
          background: step.color,
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }
      )} />
      
      <div style={utils.combine(
        ds.p(6),
        styles.layout.flexCenter(),
        { justifyContent: 'flex-start', gap: tokens.spacing[4] }
      )}>
        {/* Icon */}
        <div style={utils.combine(
          styles.layout.flexCenter(),
          ds.size('3rem'),
          ds.rounded('xl'),
          ds.bg(step.color),
          ds.shadow('md'),
          ds.text('xl'),
          { flexShrink: 0 }
        )}>
          {step.icon}
        </div>
        
        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={utils.combine(
            styles.layout.flexBetween(),
            ds.mb(2)
          )}>
            <h4 style={utils.combine(
              ds.text('lg', 'semibold'),
              ds.color(tokens.colors.text.primary)
            )}>
              {step.name}
            </h4>
            {isSelected && (
              <div style={utils.combine(
                ds.size('1.5rem'),
                ds.rounded('full'),
                ds.bg(tokens.colors.brand.success),
                styles.layout.flexCenter(),
                ds.color('white'),
                ds.text('xs', 'bold')
              )}>
                ✓
              </div>
            )}
          </div>
          <p style={utils.combine(
            ds.text('sm'),
            ds.color(tokens.colors.text.secondary),
            { opacity: 0.8, lineHeight: tokens.typography.lineHeight.snug }
          )}>
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface OptionGridProps {
  title: string;
  icon: string;
  color: string;
  options: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const OptionGrid: React.FC<OptionGridProps> = ({
  title,
  icon,
  color,
  options,
  selectedValue,
  onSelect
}) => {
  return (
    <div style={utils.combine(
      {
        background: `${color}1A`,
        border: `1px solid ${color}4D`
      },
      ds.mb(8),
      ds.rounded('2xl'),
      ds.p(6)
    )}>
      <div style={utils.combine(
        styles.layout.flexCenter(),
        { justifyContent: 'flex-start' },
        ds.mb(4),
        { gap: tokens.spacing[2] }
      )}>
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <h4 style={utils.combine(
          ds.text('lg', 'semibold'),
          ds.color(color)
        )}>
          {title}
        </h4>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: tokens.spacing[3]
      }}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            style={utils.combine(
              {
                border: selectedValue === option.value 
                  ? `2px solid ${color}`
                  : `1px solid ${tokens.colors.border.light}`,
                background: selectedValue === option.value 
                  ? color
                  : tokens.colors.background.secondary,
                color: selectedValue === option.value 
                  ? 'white' 
                  : tokens.colors.text.primary,
                cursor: 'pointer',
                textAlign: 'center',
                transform: selectedValue === option.value ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedValue === option.value 
                  ? `0 4px 12px ${color}66` 
                  : 'none'
              },
              ds.p(4),
              ds.rounded('xl'),
              ds.text('sm', 'medium'),
              ds.transition('all', 'base', 'smooth')
            )}
          >
            {option.icon && (
              <div style={{ fontSize: '1.5rem', marginBottom: tokens.spacing[1] }}>
                {option.icon}
              </div>
            )}
            <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProcessingSteps;