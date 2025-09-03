import React from 'react';
import FeatureCard from './FeatureCard';
import { useTranslation } from '../i18n';
import type { ProcessingFeature, FeatureConfig } from '../types/processing';
import {
  defaultLineArtConfig,
  defaultColoringConfig,
  defaultResizeConfig,
  defaultLineThinnessConfig
} from '../types/processing';
import {
  createLocalizedLineArtConfigSchema,
  createLocalizedColoringConfigSchema,
  createLocalizedResizeConfigSchema,
  createLocalizedLineThinnessConfigSchema
} from '../types/localizedSchemas';

interface ProcessingOptionsProps {
  selectedFeature: string | null;
  onFeatureSelect: (feature: string | null) => void;
  featureConfigs: Record<string, FeatureConfig>;
  onConfigChange: (featureKey: string, configKey: string, value: string | number) => void;
  uploadedImage: string | null;
  uploadedFile: File | null;
  onProcessWithFeature: (featureKey: string) => void;
}

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  selectedFeature,
  onFeatureSelect,
  featureConfigs,
  onConfigChange,
  uploadedImage,
  uploadedFile,
  onProcessWithFeature
}) => {
  const { t } = useTranslation();
  const features: ProcessingFeature[] = [
    {
      key: 'resize',
      icon: '⚡',
      title: t('features.resize.title'),
      description: t('features.resize.description'),
      features: [
        t('features.resize.features.0'),
        t('features.resize.features.1'),
        t('features.resize.features.2')
      ],
      backgroundColor: '#4285f4',
      selectedColor: '#1a73e8',
      defaultConfig: defaultResizeConfig,
      configSchema: createLocalizedResizeConfigSchema(t)
    },
    {
      key: 'coloring',
      icon: '🎨',
      title: t('features.coloring.title'),
      description: t('features.coloring.description'),
      features: [
        t('features.coloring.features.0'),
        t('features.coloring.features.1'),
        t('features.coloring.features.2')
      ],
      backgroundColor: '#9c27b0',
      selectedColor: '#8e24aa',
      defaultConfig: defaultColoringConfig,
      configSchema: createLocalizedColoringConfigSchema(t)
    },
    {
      key: 'lineArt',
      icon: '✏️',
      title: t('features.lineArt.title'),
      description: t('features.lineArt.description'),
      features: [
        t('features.lineArt.features.0'),
        t('features.lineArt.features.1'),
        t('features.lineArt.features.2')
      ],
      backgroundColor: '#ff6f00',
      selectedColor: '#f57500',
      defaultConfig: defaultLineArtConfig,
      configSchema: createLocalizedLineArtConfigSchema(t)
    },
    {
      key: 'lineThickness',
      icon: '📏',
      title: t('features.lineThickness.title'),
      description: t('features.lineThickness.description'),
      features: [
        t('features.lineThickness.features.0'),
        t('features.lineThickness.features.1'),
        t('features.lineThickness.features.2')
      ],
      backgroundColor: '#00bcd4',
      selectedColor: '#00acc1',
      defaultConfig: defaultLineThinnessConfig,
      configSchema: createLocalizedLineThinnessConfigSchema(t)
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
          uploadedImage={uploadedImage}
          uploadedFile={uploadedFile}
          onProcessWithFeature={() => onProcessWithFeature(feature.key)}
        />
      ))}
    </div>
  );
};

export default ProcessingOptions;