import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';

export interface UploadZoneProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  uploadedImage?: string | null;
  accept?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  uploadedImage,
  accept = "image/*"
}) => {
  return (
    <div 
      style={utils.combine(
        {
          border: isDragging 
            ? `3px dashed ${tokens.colors.brand.secondary}99` 
            : `2px dashed ${tokens.colors.brand.secondary}4D`,
          textAlign: 'center',
          minHeight: '320px',
          cursor: 'pointer',
          position: 'relative',
          background: isDragging 
            ? `${tokens.colors.brand.secondary}1A`
            : 'transparent',
          transform: isDragging ? 'scale(1.02)' : 'scale(1)'
        },
        styles.layout.flexCenter(),
        { flexDirection: 'column' },
        ds.rounded('2xl'),
        ds.p(12),
        ds.transition('all', 'base', 'smooth')
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={onFileSelect}
        style={styles.input.file()}
      />
      
      {uploadedImage ? (
        <ImagePreview src={uploadedImage} />
      ) : (
        <EmptyState isDragging={isDragging} />
      )}
    </div>
  );
};

interface ImagePreviewProps {
  src: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img 
        src={src} 
        alt="Uploaded preview" 
        style={utils.combine(
          {
            maxWidth: '100%',
            maxHeight: '280px',
            objectFit: 'cover',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          },
          ds.rounded('xl'),
          ds.shadow('glass-lg')
        )}
      />
      <div style={utils.combine(
        ds.absolute('1rem', '1rem', undefined, undefined),
        ds.bg('rgba(0, 0, 0, 0.6)'),
        ds.rounded('xl'),
        ds.p(2),
        { backdropFilter: 'blur(10px)' }
      )}>
        <span style={{ fontSize: '1.2rem' }}>✓</span>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  isDragging: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDragging }) => {
  return (
    <div style={utils.combine(
      styles.layout.flexCenter(),
      { flexDirection: 'column', gap: tokens.spacing[6] }
    )}>
      <div style={utils.combine(
        ds.size('5rem'),
        ds.rounded('full'),
        ds.bg('rgba(255, 255, 255, 0.15)'),
        styles.layout.flexCenter(),
        ds.text('2xl'),
        { animation: isDragging ? 'pulse 1s infinite' : 'none' }
      )}>
        {isDragging ? '⬇' : '📁'}
      </div>
      <div>
        <p style={utils.combine(
          ds.text('xl', 'semibold'),
          ds.mb(2)
        )}>
          {isDragging ? 'Drop your image here' : 'Choose your masterpiece'}
        </p>
        <p style={utils.combine(
          ds.text('base'),
          { opacity: 0.7 },
          ds.mb(4)
        )}>
          PNG, JPEG, GIF, WebP • Up to 10MB
        </p>
        <div style={utils.combine(
          styles.layout.flexCenter(),
          { gap: tokens.spacing[3] },
          ds.text('sm'),
          { opacity: 0.6 }
        )}>
          <span>⚡ Instant processing</span>
          <span>•</span>
          <span>🔒 Privacy protected</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;