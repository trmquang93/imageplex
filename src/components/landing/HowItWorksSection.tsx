import React from 'react';
import { useTranslation } from '../../i18n';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      icon: '📤',
      key: 'step1',
      color: '#3b82f6'
    },
    {
      number: 2,
      icon: '⚙️',
      key: 'step2',
      color: '#8b5cf6'
    },
    {
      number: 3,
      icon: '📥',
      key: 'step3',
      color: '#06b6d4'
    }
  ];

  return (
    <section style={{
      padding: '120px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('landing.howItWorks.headline')}
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {steps.map((step, index) => (
            <div
              key={step.key}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Connection line (desktop only) */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: 'calc(100% - 20px)',
                  width: 'calc(100% - 60px)',
                  height: '2px',
                  background: `linear-gradient(to right, ${step.color}, ${steps[index + 1].color})`,
                  zIndex: 0,
                  opacity: 0.3,
                  display: window.innerWidth > 768 ? 'block' : 'none'
                }} />
              )}

              {/* Step circle */}
              <div style={{
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontSize: '2rem',
                color: 'white',
                boxShadow: `0 8px 32px ${step.color}40`,
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.3s ease'
              }}>
                {step.icon}
                
                {/* Step number */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div style={{
                maxWidth: '280px'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  {t(`landing.howItWorks.${step.key}.title`)}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {t(`landing.howItWorks.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom illustration/demo */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            {/* Upload visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🖼️
              </div>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Your Image</span>
            </div>

            {/* Arrow */}
            <div style={{ color: '#94a3b8', fontSize: '1.5rem' }}>→</div>

            {/* Processing visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                ⚡
              </div>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>AI Processing</span>
            </div>

            {/* Arrow */}
            <div style={{ color: '#94a3b8', fontSize: '1.5rem' }}>→</div>

            {/* Result visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                ✨
              </div>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Perfect Result</span>
            </div>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            margin: '0',
            fontWeight: '500'
          }}>
            Professional image processing in seconds, not hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;