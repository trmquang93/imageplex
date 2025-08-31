import React from 'react';
import FeatureCard from './FeatureCard';
import type { ProcessingFeature, FeatureConfig } from '../types/processing';
import {
  defaultLineArtConfig,
  defaultColoringConfig,
  defaultResizeConfig,
  lineArtConfigSchema,
  coloringConfigSchema,
  resizeConfigSchema
} from '../types/processing';

interface ProcessingOptionsProps {
  selectedFeature: string | null;
  onFeatureSelect: (feature: string | null) => void;
  featureConfigs: Record<string, FeatureConfig>;
  onConfigChange: (featureKey: string, configKey: string, value: string | number) => void;
}

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  selectedFeature,
  onFeatureSelect,
  featureConfigs,
  onConfigChange
}) => {
  const features: ProcessingFeature[] = [
    {
      key: 'resize',
      icon: '⚡',
      title: 'Intelligent Resize',
      description: 'Smart cropping and scaling that preserves important visual elements with AI-powered composition adjustment.',
      features: [
        'Square, Portrait, Landscape formats',
        'Content-aware scaling',
        'Custom aspect ratios'
      ],
      backgroundColor: '#4285f4',
      selectedColor: '#1a73e8',
      defaultConfig: defaultResizeConfig,
      configSchema: resizeConfigSchema
    },
    {
      key: 'coloring',
      icon: '🎨',
      title: 'AI Image Coloring',
      description: 'Transform line art into vibrant colored illustrations with multiple artistic styles and intelligent color application.',
      features: [
        'Multiple artistic styles',
        'Color preference settings',
        'Background completion'
      ],
      backgroundColor: '#9c27b0',
      selectedColor: '#8e24aa',
      defaultConfig: defaultColoringConfig,
      configSchema: coloringConfigSchema
    },
    {
      key: 'lineArt',
      icon: '✏️',
      title: 'Line Art Conversion',
      description: 'Convert photos into clean line art perfect for coloring books with adjustable line weight and detail complexity.',
      features: [
        'Multiple line art styles',
        'Adjustable line weight',
        'Print-ready output'
      ],
      backgroundColor: '#ff6f00',
      selectedColor: '#f57500',
      defaultConfig: defaultLineArtConfig,
      configSchema: lineArtConfigSchema
    }
  ];

  const handleFeatureSelect = (featureKey: string) => {
    onFeatureSelect(selectedFeature === featureKey ? null : featureKey);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      marginBottom: '60px'
    }}>
      {features.map((feature) => (
        <FeatureCard
          key={feature.key}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          features={feature.features}
          backgroundColor={feature.backgroundColor}
          selectedColor={feature.selectedColor}
          isSelected={selectedFeature === feature.key}
          onSelect={() => handleFeatureSelect(feature.key)}
          config={featureConfigs[feature.key]}
          configSchema={feature.configSchema}
          onConfigChange={(configKey, value) => onConfigChange(feature.key, configKey, value)}
        />
      ))}
    </div>
  );
};

export default ProcessingOptions;