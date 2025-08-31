import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockStorage } from '../test/i18n-test-utils';
import App from '../App';

// Mock the image processor to avoid API calls in tests
vi.mock('../services/imageProcessor', () => ({
  ImageProcessor: {
    intelligentResize: vi.fn().mockResolvedValue({
      success: true,
      imageUrl: 'data:image/jpeg;base64,test',
      imageBlob: new Blob(['test'], { type: 'image/jpeg' })
    }),
    aiColoring: vi.fn().mockResolvedValue({
      success: true,
      imageUrl: 'data:image/jpeg;base64,test',
      imageBlob: new Blob(['test'], { type: 'image/jpeg' })
    }),
    lineArtConversion: vi.fn().mockResolvedValue({
      success: true,
      imageUrl: 'data:image/jpeg;base64,test',
      imageBlob: new Blob(['test'], { type: 'image/jpeg' })
    })
  }
}));

// Mock FileReader
global.FileReader = class FileReader {
  readAsDataURL = vi.fn();
  addEventListener = vi.fn();
  result = 'data:image/jpeg;base64,test';
  
  constructor() {
    setTimeout(() => {
      if (this.onload) {
        this.onload({ target: { result: this.result } } as any);
      }
    }, 0);
  }
} as any;

describe('App Integration - Vietnamese Localization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display English content by default', () => {
    render(<App />, { initialLanguage: 'en' });

    // Check main upload section
    expect(screen.getByText('Upload Your Images')).toBeInTheDocument();
    expect(screen.getByText('Support for PNG, JPEG, GIF, and WebP formats')).toBeInTheDocument();
    expect(screen.getByText('Drop your images here')).toBeInTheDocument();
    expect(screen.getByText('Choose Files')).toBeInTheDocument();

    // Check processing features
    expect(screen.getByText('Intelligent Resize')).toBeInTheDocument();
    expect(screen.getByText('AI Image Coloring')).toBeInTheDocument();
    expect(screen.getByText('Line Art Conversion')).toBeInTheDocument();
  });

  it('should switch to Vietnamese when VI button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'en' });

    // Click Vietnamese language button
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    await user.click(viButton);

    // Check that content switches to Vietnamese
    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
    expect(screen.getByText('Hỗ trợ định dạng PNG, JPEG, GIF và WebP')).toBeInTheDocument();
    expect(screen.getByText('Thả hình ảnh vào đây')).toBeInTheDocument();
    expect(screen.getByText('Chọn Tệp')).toBeInTheDocument();

    // Check processing features in Vietnamese
    expect(screen.getByText('Thay Đổi Kích Thước Thông Minh')).toBeInTheDocument();
    expect(screen.getByText('Tô Màu Hình Ảnh AI')).toBeInTheDocument();
    expect(screen.getByText('Chuyển Đổi Line Art')).toBeInTheDocument();
  });

  it('should maintain Vietnamese language after page interaction', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Verify Vietnamese content is displayed initially
    await screen.findByText('Tải Lên Hình Ảnh');
    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();

    // Click on a feature to expand it
    const resizeFeature = screen.getByText('Thay Đổi Kích Thước Thông Minh');
    await user.click(resizeFeature.closest('div')!);

    // Content should still be in Vietnamese after interaction
    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
  });

  it('should show Vietnamese processing options when feature is selected', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Click on resize feature
    const resizeButton = screen.getByText('Thay Đổi Kích Thước Thông Minh').closest('div')!;
    await user.click(resizeButton);

    // Check Vietnamese aspect ratio options
    expect(screen.getByText('Tỷ Lệ Khung Hình')).toBeInTheDocument();
    expect(screen.getByText('Vuông (1:1)')).toBeInTheDocument();
    expect(screen.getByText('Dọc (3:4)')).toBeInTheDocument();
  });

  it('should show Vietnamese processing options for coloring feature', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Click on coloring feature
    const coloringButton = screen.getByText('Tô Màu Hình Ảnh AI').closest('div')!;
    await user.click(coloringButton);

    // Check Vietnamese coloring style options
    expect(screen.getByText('Phong Cách Tô Màu')).toBeInTheDocument();
    expect(screen.getByText('Bút chì màu')).toBeInTheDocument();
    expect(screen.getByText('Màu nước')).toBeInTheDocument();
    expect(screen.getByText('Kỹ thuật số')).toBeInTheDocument();
  });

  it('should show Vietnamese processing options for line art feature', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Click on line art feature
    const lineArtButton = screen.getByText('Chuyển Đổi Line Art').closest('div')!;
    await user.click(lineArtButton);

    // Check Vietnamese line art style options
    expect(screen.getByText('Kiểu Đường Nét')).toBeInTheDocument();
    expect(screen.getByText('Đen trên Trắng')).toBeInTheDocument();
    expect(screen.getByText('Trắng trên Đen')).toBeInTheDocument();
  });

  it('should handle file upload with Vietnamese interface', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('textbox', { hidden: true }) || 
                 document.querySelector('input[type="file"]') as HTMLInputElement;

    if (input) {
      await user.upload(input, file);

      // Should show Vietnamese success message
      expect(screen.getByText('✓ Tải lên hình ảnh thành công')).toBeInTheDocument();
    }
  });

  it('should show Vietnamese processing button after file upload and feature selection', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'vi' });

    // Upload file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (input) {
      Object.defineProperty(input, 'files', {
        value: [file],
        configurable: true
      });
      fireEvent.change(input);

      // Select a feature
      const resizeButton = screen.getByText('Thay Đổi Kích Thước Thông Minh').closest('div')!;
      await user.click(resizeButton);

      // Should show Vietnamese process button
      expect(screen.getByText('Xử Lý Hình Ảnh')).toBeInTheDocument();
    }
  });

  it('should persist language preference in localStorage', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'en' });

    // Switch to Vietnamese
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    await user.click(viButton);

    // Check localStorage was updated
    expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'vi');
  });

  it('should start with Vietnamese if previously selected', () => {
    render(<App />, { initialLanguage: 'vi' });

    // Should immediately show Vietnamese content
    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
    expect(screen.getByText('Thay Đổi Kích Thước Thông Minh')).toBeInTheDocument();

    // VI button should be active
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    expect(viButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
  });

  it('should handle language switching during feature interaction', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'en' });

    // Select a feature in English
    const resizeButton = screen.getByText('Intelligent Resize').closest('div')!;
    await user.click(resizeButton);

    // Verify English options are shown
    expect(screen.getByText('Aspect Ratio')).toBeInTheDocument();

    // Switch to Vietnamese
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    await user.click(viButton);

    // Options should now be in Vietnamese
    expect(screen.getByText('Tỷ Lệ Khung Hình')).toBeInTheDocument();
    expect(screen.getByText('Vuông (1:1)')).toBeInTheDocument();
  });
});