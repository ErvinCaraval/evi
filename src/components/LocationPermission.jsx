import { useState, useEffect } from 'react';
import './PermissionModal.css';

const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PrivacyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const LocationPermission = ({ onNext, showToast }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState('precise');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAction = (action) => {
    if (showToast) {
        const messages = {
            allow: 'Permiso de ubicación concedido',
            once: 'Ubicación permitida solo por esta vez',
            deny: 'Permiso de ubicación denegado'
        }
        showToast(messages[action] || 'Acción registrada', 'info');
    }
     setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className={`permission-modal ${isVisible ? 'visible' : ''}`}>
      <div className="permission-backdrop" onClick={() => handleAction('deny')} />

      <div className="permission-card">
        <div className="permission-icon-wrapper">
          <div className="permission-icon location-icon">
            <LocationIcon />
          </div>
        </div>
        <h2 className="permission-title">Encuentra gente cerca de ti</h2>
        <p className="permission-description">
          Para descubrir a otros usuarios, BitChat necesita saber quién está cerca. Tu ubicación permite la conexión.
        </p>

        <div className="location-options">
          <div
            className={`location-option ${selected === 'precise' ? 'selected' : ''}`}
            onClick={() => setSelected('precise')}
          >
            <div className="location-visual precise">
              <svg viewBox="0 0 120 120">
                <defs>
                  <radialGradient id="preciseGradient"><stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" /></radialGradient>
                </defs>
                {[30, 50, 70, 90].map((r, i) => (<circle key={r} cx="60" cy="60" r={r} fill="none" stroke="url(#preciseGradient)" strokeWidth="1" opacity={1 - i * 0.2} style={{ animationDelay: `${i * 0.3}s` }}/>))}
                <circle cx="60" cy="60" r="6" fill="var(--accent-primary)"/>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const distance = 20 + Math.random() * 50;
                  const x = 60 + Math.cos(angle) * distance;
                  const y = 60 + Math.sin(angle) * distance;
                  const size = 2 + Math.random() * 2;
                  return (<circle key={`dot-${i}`} cx={x} cy={y} r={size} fill={i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#4ecdc4' : '#ffd93d'} opacity="0.8" style={{ animationDelay: `${i * 0.1}s` }}/>)
                })}
              </svg>
            </div>
            <div className="location-option-content">
              <h3>Precisa</h3>
              <p>Ideal para conectar con gente en el mismo lugar, como un café o un parque.</p>
            </div>
          </div>

          <div
            className={`location-option ${selected === 'approximate' ? 'selected' : ''}`}
            onClick={() => setSelected('approximate')}
          >
             <div className="location-visual approximate">
               <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.1" /></linearGradient>
                </defs>
                {[...Array(5)].map((_, i) => (<g key={`lines-${i}`}>
                    <line x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="100" stroke="url(#gridGradient)" strokeWidth="1" style={{ animationDelay: `${i * 0.05}s` }}/>
                    <line x1="20" y1={20 + i * 20} x2="100" y2={20 + i * 20} stroke="url(#gridGradient)" strokeWidth="1" style={{ animationDelay: `${i * 0.05}s` }}/>
                </g>))}
                <circle cx="60" cy="60" r="8" fill="var(--accent-primary)"/>
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * Math.PI / 180;
                  const distance = 35;
                  const x = 60 + Math.cos(angle) * distance;
                  const y = 60 + Math.sin(angle) * distance;
                  return (<circle key={`area-dot-${i}`} cx={x} cy={y} r="3" fill="#ffd93d" opacity="0.7" style={{ animationDelay: `${i * 0.15}s` }} />)
                })}
              </svg>
            </div>
            <div className="location-option-content">
              <h3>Aproximada</h3>
              <p>Perfecto si prefieres mantener tu ubicación más general, como tu barrio.</p>
            </div>
          </div>
        </div>

        <div className="permission-actions">
          <button
            className="permission-btn primary"
            onClick={() => handleAction('allow')}
          >
            Mientras uso la app
          </button>
          <button
            className="permission-btn secondary"
            onClick={() => handleAction('once')}
          >
            Solo esta vez
          </button>
          <button
            className="permission-btn tertiary"
            onClick={() => handleAction('deny')}
          >
            No permitir
          </button>
        </div>

        <div className="permission-note">
            <PrivacyIcon />
            <span>Tu ubicación es temporal, no se almacena y solo se usa en tu dispositivo para la conexión.</span>
        </div>
      </div>
    </div>
  );
};

export default LocationPermission;
