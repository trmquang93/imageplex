import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockStorage } from '../../test/i18n-test-utils';
import LanguageSwitch from '../LanguageSwitch';

describe('LanguageSwitch Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render language switcher with EN and VI buttons', () => {
    render(<LanguageSwitch />);

    expect(screen.getByText('🇺🇸 EN')).toBeInTheDocument();
    expect(screen.getByText('🇻🇳 VI')).toBeInTheDocument();
    expect(screen.getByText(/Language:/)).toBeInTheDocument();
  });

  it('should show English as active by default', () => {
    render(<LanguageSwitch />, { initialLanguage: 'en' });

    const enButton = screen.getByRole('button', { name: /🇺🇸 EN/ });
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });

    // English button should have active styling (purple background)
    expect(enButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
    expect(viButton).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('should show Vietnamese as active when language is vi', () => {
    render(<LanguageSwitch />, { initialLanguage: 'vi' });

    const enButton = screen.getByRole('button', { name: /🇺🇸 EN/ });
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });

    // Vietnamese button should have active styling
    expect(viButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
    expect(enButton).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('should switch to Vietnamese when VI button is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />, { initialLanguage: 'en' });

    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    
    await user.click(viButton);

    expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'vi');
    expect(viButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
  });

  it('should switch to English when EN button is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />, { initialLanguage: 'vi' });

    const enButton = screen.getByRole('button', { name: /🇺🇸 EN/ });
    
    await user.click(enButton);

    expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'en');
    expect(enButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
  });

  it('should have proper styling with glassmorphism effect', () => {
    render(<LanguageSwitch />);

    const container = screen.getByText(/Language:/).closest('div');
    
    expect(container).toHaveStyle({
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1000',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px'
    });
  });

  it('should display Language label in current language', () => {
    render(<LanguageSwitch />, { initialLanguage: 'en' });
    expect(screen.getByText('Language:')).toBeInTheDocument();
  });

  it('should display Vietnamese Language label when language is vi', () => {
    render(<LanguageSwitch />, { initialLanguage: 'vi' });
    expect(screen.getByText('Ngôn ngữ:')).toBeInTheDocument();
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />, { initialLanguage: 'en' });

    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    
    // Focus and activate with keyboard
    await user.tab();
    await user.tab();
    expect(viButton).toHaveFocus();
    
    await user.keyboard('[Enter]');
    expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'vi');
  });

  it('should handle rapid language switching', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />, { initialLanguage: 'en' });

    const enButton = screen.getByRole('button', { name: /🇺🇸 EN/ });
    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });

    // Rapidly switch languages
    await user.click(viButton);
    await user.click(enButton);
    await user.click(viButton);
    await user.click(enButton);

    expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'en');
    expect(enButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
  });

  it('should maintain button state during interactions', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />, { initialLanguage: 'en' });

    const viButton = screen.getByRole('button', { name: /🇻🇳 VI/ });
    
    // Hover and click interactions
    await user.hover(viButton);
    await user.click(viButton);

    expect(viButton).toHaveStyle({ backgroundColor: '#9c27b0', color: 'white' });
  });
});