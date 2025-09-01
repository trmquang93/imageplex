import React from 'react';
import { useTranslation } from '../../i18n';
import LanguageSwitch from '../LanguageSwitch';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '60px 20px 40px',
      color: '#cbd5e1',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand section */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ImagePlex
            </h3>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: '#94a3b8',
              margin: '0 0 20px 0'
            }}>
              {t('landing.footer.tagline')}
            </p>
            
            {/* Language switcher */}
            <div style={{
              marginTop: '20px'
            }}>
              <LanguageSwitch />
            </div>
          </div>

          {/* Features section */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              Features
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>
              {[
                { key: 'resize', label: 'Intelligent Resize' },
                { key: 'coloring', label: 'AI Coloring' },
                { key: 'lineArt', label: 'Line Art Conversion' }
              ].map((item) => (
                <li key={item.key} style={{
                  marginBottom: '8px'
                }}>
                  <span style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                  }}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick stats */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              Why Choose ImagePlex
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                { icon: '⚡', label: 'Lightning Fast Processing' },
                { icon: '🔒', label: 'Secure & Private' },
                { icon: '🎯', label: 'Professional Results' },
                { icon: '🌍', label: 'Available in 2 Languages' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem'
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent)',
          marginBottom: '30px'
        }} />

        {/* Bottom section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            © 2024 ImagePlex. Crafted with precision for creators worldwide.
          </div>

          {/* Technology badges */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
            {[
              { label: 'AI Powered', color: '#3b82f6' },
              { label: 'React', color: '#61dafb' },
              { label: 'TypeScript', color: '#3178c6' }
            ].map((tech, index) => (
              <div key={index} style={{
                padding: '4px 12px',
                background: `${tech.color}20`,
                border: `1px solid ${tech.color}40`,
                borderRadius: '12px',
                fontSize: '0.75rem',
                color: tech.color,
                fontWeight: '500'
              }}>
                {tech.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;