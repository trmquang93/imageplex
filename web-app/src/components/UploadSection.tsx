import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

interface UploadSectionProps {
  uploadedImage: string | null;
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedFeature: string | null;
  onProcessImage: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  uploadedImage,
  onImageUpload,
  selectedFeature,
  onProcessImage
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a proper synthetic event for the file input
      const fileList: FileList = {
        0: file,
        length: 1,
        item: (index: number) => index === 0 ? file : null,
        [Symbol.iterator]: function* () {
          yield file;
        }
      } as FileList;

      const syntheticEvent = {
        target: { files: fileList },
        currentTarget: { files: fileList }
      } as ChangeEvent<HTMLInputElement>;
      
      onImageUpload(syntheticEvent);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '60px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 60px auto'
    }}>
      <h2 style={{
        fontSize: '32px',
        fontWeight: '600',
        color: '#202124',
        margin: '0 0 8px 0'
      }}>
        Upload Your Images
      </h2>
      
      <p style={{
        fontSize: '18px',
        color: '#5f6368',
        margin: '0 0 40px 0'
      }}>
        Support for PNG, JPEG, GIF, and WebP formats
      </p>

      <div
        style={{
          border: isDragging ? '3px solid #9c27b0' : '3px dashed #dadce0',
          borderRadius: '16px',
          padding: '60px 40px',
          backgroundColor: isDragging ? '#f3e5f5' : '#fafbfc',
          transition: 'all 0.3s ease',
          marginBottom: '24px'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedImage ? (
          <div>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            />
            <p style={{
              fontSize: '16px',
              color: '#34a853',
              margin: '0'
            }}>
              ✓ Image uploaded successfully
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              fontSize: '64px',
              color: '#9aa0a6',
              marginBottom: '16px'
            }}>
              ☁️
            </div>
            <p style={{
              fontSize: '24px',
              fontWeight: '500',
              color: '#202124',
              margin: '0 0 8px 0'
            }}>
              Drop your images here
            </p>
            <p style={{
              fontSize: '16px',
              color: '#5f6368',
              margin: '0 0 32px 0'
            }}>
              or click to browse your files
            </p>
            
            <label style={{
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'all 0.2s ease'
            }}>
              Choose Files
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        )}
      </div>

      <p style={{
        fontSize: '14px',
        color: '#5f6368',
        margin: '0'
      }}>
        Maximum file size: 10MB • Batch processing supported
      </p>

      {uploadedImage && selectedFeature && (
        <button
          onClick={onProcessImage}
          style={{
            backgroundColor: '#34a853',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '32px',
            transition: 'all 0.2s ease'
          }}
        >
          Process Image
        </button>
      )}
    </div>
  );
};

export default UploadSection;