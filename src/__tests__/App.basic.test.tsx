import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/i18n-test-utils';
import App from '../App';

// Mock the image processor
vi.mock('../services/imageProcessor', () => ({
  ImageProcessor: {
    intelligentResize: vi.fn(),
    aiColoring: vi.fn(),
    lineArtConversion: vi.fn()
  }
}));

describe('App Basic Localization', () => {
  it('should display English content by default', () => {
    render(<App />, { initialLanguage: 'en' });

    expect(screen.getByText('Upload Your Images')).toBeInTheDocument();
    expect(screen.getByText('Intelligent Resize')).toBeInTheDocument();
    expect(screen.getByText('AI Image Coloring')).toBeInTheDocument();
    expect(screen.getByText('Line Art Conversion')).toBeInTheDocument();
  });

  it('should display Vietnamese content when language is vi', () => {
    render(<App />, { initialLanguage: 'vi' });

    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
    expect(screen.getByText('Thay Đổi Kích Thước Thông Minh')).toBeInTheDocument();
    expect(screen.getByText('Tô Màu Hình Ảnh AI')).toBeInTheDocument();
    expect(screen.getByText('Chuyển Đổi Line Art')).toBeInTheDocument();
  });

  it('should switch from English to Vietnamese', async () => {
    const user = userEvent.setup();
    render(<App />, { initialLanguage: 'en' });

    // Verify English content initially
    expect(screen.getByText('Upload Your Images')).toBeInTheDocument();

    // Click Vietnamese button
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    await user.click(viButton);

    // Should show Vietnamese content
    expect(screen.getByText('Tải Lên Hình Ảnh')).toBeInTheDocument();
  });

  it('should have language switcher', () => {
    render(<App />, { initialLanguage: 'en' });

    expect(screen.getByText('🇺🇸 EN')).toBeInTheDocument();
    expect(screen.getByText('🇻🇳 VI')).toBeInTheDocument();
  });
});