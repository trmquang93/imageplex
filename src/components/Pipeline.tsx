import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';
import { Card, SectionHeader } from './Card';

export interface ProcessingStep {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface PipelineVisualizationProps {
  selectedSteps: string[];
  processingSteps: ProcessingStep[];
}

export const PipelineVisualization: React.FC<PipelineVisualizationProps> = ({
  selectedSteps,
  processingSteps
}) => {
  if (selectedSteps.length === 0) return null;

  return (
    <Card style={ds.mt(12)}>
      <SectionHeader
        icon="🔗"
        title="Processing Pipeline"
        iconColor={tokens.colors.brand.success}
      />
      
      <div style={utils.combine(
        styles.layout.flexCenter(),
        { gap: tokens.spacing[4], flexWrap: 'wrap', justifyContent: 'center' }
      )}>
        {/* Upload Step */}
        <PipelineStep icon="📤" label="Upload" color={tokens.colors.brand.secondary} />
        
        {/* Processing Steps */}
        {selectedSteps.map((stepId) => {
          const step = processingSteps.find(s => s.id === stepId);
          if (!step) return null;
          
          return (
            <React.Fragment key={stepId}>
              <PipelineArrow />
              <PipelineStep 
                icon={step.icon} 
                label={step.name} 
                color={step.color} 
              />
            </React.Fragment>
          );
        })}
        
        <PipelineArrow />
        
        {/* Download Step */}
        <PipelineStep icon="📥" label="Download" color={tokens.colors.brand.success} />
      </div>
    </Card>
  );
};

interface PipelineStepProps {
  icon: string;
  label: string;
  color: string;
}

const PipelineStep: React.FC<PipelineStepProps> = ({ icon, label, color }) => {
  return (
    <div style={utils.combine(
      styles.layout.flexCenter(),
      { gap: tokens.spacing[2] },
      ds.px(4),
      ds.py(3),
      ds.bg(`${color}33`),
      ds.rounded('xl'),
      ds.border(undefined, `${color}66`),
      ds.text('sm', 'semibold'),
      ds.shadow('sm')
    )}>
      <span style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </div>
  );
};

const PipelineArrow: React.FC = () => {
  return (
    <div style={utils.combine(
      styles.layout.flexCenter(),
      ds.text('xl'),
      ds.color(tokens.colors.text.tertiary)
    )}>
      →
    </div>
  );
};

export default PipelineVisualization;