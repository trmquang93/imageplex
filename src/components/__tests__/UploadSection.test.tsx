import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/i18n-test-utils';
import UploadSection from '../UploadSection';

// Mock FileReader
global.FileReader = class FileReader {
  readAsDataURL = vi.fn();
  addEventListener = vi.fn();
  result = 'data:image/jpeg;base64,test';
  onload: ((ev: any) => any) | null = null;
  
  constructor() {
    setTimeout(() => {
      if (this.onload) {
        this.onload({ target: { result: this.result } });
      }
    }, 0);
  }
} as any;

describe('UploadSection Localization', () => {
  const mockOnImageUpload = vi.fn();
  const mockOnProcessImage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display English text by default', () => {
    render(
      <UploadSection
        uploadedImage={null}
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'en' }
    );

    expect(screen.getByText('Upload Your Images')).toBeInTheDocument();
    expect(screen.getByText('Support for PNG, JPEG, GIF, and WebP formats')).toBeInTheDocument();
    expect(screen.getByText('Drop your images here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse your files')).toBeInTheDocument();
    expect(screen.getByText('Choose Files')).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 10MB • Batch processing supported')).toBeInTheDocument();
  });

  it('should display Vietnamese text when language is vi', () => {
    render(
      <UploadSection
        uploadedImage={null}
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
    expect(screen.getByText('Hỗ trợ định dạng PNG, JPEG, GIF và WebP')).toBeInTheDocument();
    expect(screen.getByText('Thả hình ảnh vào đây')).toBeInTheDocument();
    expect(screen.getByText('hoặc nhấp để duyệt tệp')).toBeInTheDocument();
    expect(screen.getByText('Chọn Tệp')).toBeInTheDocument();
    expect(screen.getByText('Kích thước tối đa: 10MB • Hỗ trợ xử lý hàng loạt')).toBeInTheDocument();
  });

  it('should show English success message after image upload', () => {
    render(
      <UploadSection
        uploadedImage="data:image/jpeg;base64,test"
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'en' }
    );

    expect(screen.getByText('✓ Image uploaded successfully')).toBeInTheDocument();
  });

  it('should show Vietnamese success message after image upload', () => {
    render(
      <UploadSection
        uploadedImage="data:image/jpeg;base64,test"
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    expect(screen.getByText('✓ Tải lên hình ảnh thành công')).toBeInTheDocument();
  });

  it('should show English process button when image and feature are selected', () => {
    render(
      <UploadSection
        uploadedImage="data:image/jpeg;base64,test"
        onImageUpload={mockOnImageUpload}
        selectedFeature="resize"
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'en' }
    );

    expect(screen.getByText('Process Image')).toBeInTheDocument();
  });

  it('should show Vietnamese process button when image and feature are selected', () => {
    render(
      <UploadSection
        uploadedImage="data:image/jpeg;base64,test"
        onImageUpload={mockOnImageUpload}
        selectedFeature="resize"
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    expect(screen.getByText('Xử Lý Hình Ảnh')).toBeInTheDocument();
  });

  it('should handle file upload in Vietnamese interface', async () => {
    const user = userEvent.setup();
    render(
      <UploadSection
        uploadedImage={null}
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    // Find the file input
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    if (input) {
      await user.upload(input, file);
      expect(mockOnImageUpload).toHaveBeenCalled();
    }
  });

  it('should call onProcessImage when Vietnamese process button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <UploadSection
        uploadedImage="data:image/jpeg;base64,test"
        onImageUpload={mockOnImageUpload}
        selectedFeature="resize"
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    const processButton = screen.getByText('Xử Lý Hình Ảnh');
    await user.click(processButton);

    expect(mockOnProcessImage).toHaveBeenCalled();
  });

  it('should handle drag and drop with Vietnamese interface', async () => {
    render(
      <UploadSection
        uploadedImage={null}
        onImageUpload={mockOnImageUpload}
        selectedFeature={null}
        onProcessImage={mockOnProcessImage}
      />,
      { initialLanguage: 'vi' }
    );

    const dropZone = screen.getByText('Thả hình ảnh vào đây').closest('div')!;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    // Simulate drag and drop
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [file]
      }
    });

    expect(mockOnImageUpload).toHaveBeenCalled();
  });
});