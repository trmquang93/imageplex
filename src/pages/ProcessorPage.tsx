import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { UploadSection, ProcessingOptions } from '../components';
import ProcessingModal from '../components/ProcessingModal';
import ResultsModal from '../components/ResultsModal';
import LanguageSwitch from '../components/LanguageSwitch';
import type { FeatureConfig, LineArtConfig, ColoringConfig, ResizeConfig } from '../types/processing';
import {
  defaultLineArtConfig,
  defaultColoringConfig,
  defaultResizeConfig
} from '../types/processing';
import { ImageProcessor } from '../services/imageProcessor';
import { useTranslation } from '../i18n';

const ProcessorPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [featureConfigs, setFeatureConfigs] = useState<Record<string, FeatureConfig>>({
    resize: defaultResizeConfig,
    coloring: defaultColoringConfig,
    lineArt: defaultLineArtConfig
  });
  
  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  
  // Results state
  const [showResults, setShowResults] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [processedImageBlob, setProcessedImageBlob] = useState<Blob | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setUploadedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfigChange = (featureKey: string, configKey: string, value: string | number) => {
    setFeatureConfigs(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        [configKey]: value
      }
    }));
  };

  const handleProcessImage = async () => {
    if (!uploadedFile || !selectedFeature) {
      console.error('Missing file or feature selection');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStatus(t('processing.initializing'));

    try {
      const config = featureConfigs[selectedFeature];
      let result;

      setProcessingProgress(25);
      setProcessingStatus(t('processing.preparing'));

      // Process based on selected feature
      switch (selectedFeature) {
        case 'resize':
          setProcessingStatus(t('processing.resizing'));
          setProcessingProgress(50);
          result = await ImageProcessor.intelligentResize(uploadedFile, config as ResizeConfig);
          break;
          
        case 'coloring':
          setProcessingStatus(t('processing.coloring'));
          setProcessingProgress(50);
          result = await ImageProcessor.aiColoring(uploadedFile, config as ColoringConfig);
          break;
          
        case 'lineArt':
          setProcessingStatus(t('processing.lineArt'));
          setProcessingProgress(50);
          result = await ImageProcessor.lineArtConversion(uploadedFile, config as LineArtConfig);
          break;
          
        default:
          throw new Error(`Unknown feature: ${selectedFeature}`);
      }

      setProcessingProgress(75);
      setProcessingStatus(t('processing.finalizing'));

      if (result.success && result.imageUrl) {
        setProcessedImageUrl(result.imageUrl);
        setProcessedImageBlob(result.imageBlob || null);
        setProcessingProgress(100);
        setProcessingStatus(t('processing.complete'));
        
        // Show results after a brief delay
        setTimeout(() => {
          setIsProcessing(false);
          setShowResults(true);
        }, 500);
      } else {
        throw new Error(result.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Image processing error:', error);
      setProcessingStatus(`${t('processing.error')}: ${error instanceof Error ? error.message : 'Processing failed'}`);
      
      // Hide processing modal after showing error
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleDownload = () => {
    if (processedImageBlob) {
      const url = URL.createObjectURL(processedImageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed-${selectedFeature}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleUseAsNew = () => {
    if (processedImageUrl && processedImageBlob) {
      // Convert blob to File
      const file = new File([processedImageBlob], `processed-${Date.now()}.jpg`, {
        type: processedImageBlob.type
      });
      
      setUploadedFile(file);
      setUploadedImage(processedImageUrl);
      setShowResults(false);
      setProcessedImageUrl(null);
      setProcessedImageBlob(null);
      setSelectedFeature(null);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setProcessedImageUrl(null);
    setProcessedImageBlob(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <LanguageSwitch />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        <UploadSection
          uploadedImage={uploadedImage}
          onImageUpload={handleImageUpload}
          selectedFeature={selectedFeature}
          onProcessImage={handleProcessImage}
        />

        <ProcessingOptions
          selectedFeature={selectedFeature}
          onFeatureSelect={setSelectedFeature}
          featureConfigs={featureConfigs}
          onConfigChange={handleConfigChange}
        />
      </div>
      
      {/* Processing Modal */}
      <ProcessingModal
        isVisible={isProcessing}
        feature={selectedFeature}
        progress={processingProgress}
        status={processingStatus}
      />
      
      {/* Results Modal */}
      <ResultsModal
        isVisible={showResults}
        originalImageUrl={uploadedImage}
        processedImageUrl={processedImageUrl}
        feature={selectedFeature}
        onClose={handleCloseResults}
        onDownload={handleDownload}
        onUseAsNew={handleUseAsNew}
      />
    </div>
  );
};

export default ProcessorPage;