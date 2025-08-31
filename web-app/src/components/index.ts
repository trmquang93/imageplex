// Component Library Index
// Central export point for all reusable components

export { Card, SectionHeader } from './Card';
export type { CardProps, SectionHeaderProps } from './Card';

export { Button, ProcessingButton } from './Button';
export type { ButtonProps, ProcessingButtonProps } from './Button';

export { UploadZone } from './Upload';
export type { UploadZoneProps } from './Upload';

export { ProcessingSteps, OptionGrid } from './ProcessingSteps';
export type { 
  ProcessingStepsProps, 
  OptionGridProps,
  ProcessingStep
} from './ProcessingSteps';

export { LoadingOverlay, LoadingSpinner } from './Loading';
export type { LoadingOverlayProps, LoadingSpinnerProps } from './Loading';

export { PipelineVisualization } from './Pipeline';
export type { PipelineVisualizationProps } from './Pipeline';

export { default as UploadSection } from './UploadSection';
export { default as ProcessingOptions } from './ProcessingOptions';
export { default as FeatureCard } from './FeatureCard';
export { default as Slider } from './Slider';
export { default as Dropdown } from './Dropdown';
export { default as ProcessingModal } from './ProcessingModal';
export { default as ResultsModal } from './ResultsModal';


// Component composition helpers
import type { ProcessingStep } from './ProcessingSteps';

export const ComponentHelpers = {
  // Create a standardized section with header and content
  createSection: (
    icon: string,
    title: string,
    subtitle: string,
    children: React.ReactNode,
    iconColor?: string
  ) => ({
    icon,
    title,
    subtitle,
    children,
    iconColor
  }),

  // Create processing step data
  createProcessingStep: (
    id: string,
    name: string,
    icon: string,
    description: string,
    color: string
  ): ProcessingStep => ({
    id,
    name,
    icon,
    description,
    color
  }),

  // Create option grid data
  createOptionGrid: (
    options: Array<{ value: string; label: string; icon?: string }>
  ) => options
};