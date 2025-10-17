import { useState, useEffect } from 'react';
import './PermissionModal.css';

// --- SVG Icons --- //
const BellIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const ZapIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const SettingsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const NotificationPermission = ({ onNext, showToast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAction = (action) => {
    if (showToast) {
      const message = action === 'allow' ? 'Notificaciones activadas' : 'Notificaciones desactivadas';
      showToast(message, action === 'allow' ? 'success' : 'info');
    }
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className={`permission-modal ${isVisible ? 'visible' : ''}`}>
      <div className="permission-backdrop" onClick={() => handleAction('deny')} />

      <div className="permission-card">
        <div className="permission-icon-wrapper">
          <div className="permission-icon notification-icon">
            <BellIcon />
          </div>
        </div>

        <h2 className="permission-title">Mantente al tanto de tus mensajes</h2>
        <p className="permission-description">
          Recibe alertas cuando lleguen mensajes nuevos, incluso si la app está en segundo plano.
        </p>

        <div className="notification-illustration">
            <svg viewBox="0 0 200 120">
                 <g transform="translate(100, 60)" className="notification-bell" style={{animation: 'bellRing 2.5s ease-in-out infinite', transformOrigin: 'top center'}}>
                    <path d="M-18 8 C -18 -20, 0 -25, 18 -20 C 18 8, 18 12, -18 12 Z" fill="#ffc864" stroke="#fff" strokeWidth="1.5" opacity="0.9"></path>
                    <circle cx="0" cy="15" r="5" fill="#fff" opacity="0.8"></circle>
                    <path d="M -2 -28 L 2 -28 L 2 -23 L -2 -23 Z" fill="#fff" rx="2"></path>
                </g>
            </svg>
        </div>

        <div className="notification-benefits">
          <div className="benefit-item">
            <div className="benefit-icon" style={{ color: '#ffc864' }}><ZapIcon /></div>
            <div className="benefit-item-content">
              <h4>No te pierdas ningún mensaje</h4>
              <p>Recibe notificaciones al instante.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon" style={{ color: '#ffc864' }}><ClockIcon /></div>
            <div className="benefit-item-content">
              <h4>Responde rápidamente</h4>
              <p>Chatea en tiempo real con tus contactos.</p>
            </div>
          </div>
           <div className="benefit-item">
            <div className="benefit-icon" style={{ color: '#ffc864' }}><ShieldIcon /></div>
            <div className="benefit-item-content">
              <h4>Privadas y seguras</h4>
              <p>El contenido del mensaje no se muestra.</p>
            </div>
          </div>
        </div>

        <div className="permission-actions">
          <button className="btn btn-primary" onClick={() => handleAction('allow')}>
            Permitir notificaciones
          </button>
          <button className="btn btn-secondary" onClick={() => handleAction('deny')}>
            Omitir por ahora
          </button>
        </div>

        <div className="permission-note">
          <SettingsIcon />
          <span>Puedes personalizar las notificaciones en ajustes en cualquier momento.</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationPermission;
