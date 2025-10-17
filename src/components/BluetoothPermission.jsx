import { useState, useEffect } from 'react';
import './PermissionModal.css';

// --- SVG Icons --- //
const BluetoothIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 7 10 10-5 5V2l5 5L7 17"></path>
    </svg>
);

const DiscoverIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const MeshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M8.5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M2 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M8.5 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M5 12h3.5"></path><path d="M5 5h3.5"></path><path d="M12 5h3.5"></path><path d="M12 12h3.5"></path><path d="M15.5 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M15.5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M2 17.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M8.5 17.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path><path d="M5 19h3.5"></path><path d="M12 19h3.5"></path><path d="M15.5 17.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-3z"></path></svg>
);

const OfflineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.39 12.13c.4-2.5-1.1-4.89-3.39-5.83-2.29-.94-4.88.23-6.27 2.33-1.39 2.1-.81 4.98.98 6.37"></path><path d="M15.21 13.82a6.3 6.3 0 0 0-4.08-4.08"></path><path d="M12 12H4.44"></path><path d="M10.66 18.14a6.27 6.27 0 0 0 8.77-3.23"></path><path d="m2 2 20 20"></path></svg>
);

const PrivacyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const BluetoothPermission = ({ onNext, showToast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAction = (action) => {
    if (showToast) {
        const message = action === 'allow' ? 'Permiso de Bluetooth concedido' : 'Permiso de Bluetooth denegado';
        showToast(message, action === 'allow' ? 'success' : 'info');
    }
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className={`permission-modal ${isVisible ? 'visible' : ''}`}>
      <div className="permission-backdrop" onClick={() => handleAction('deny')} />

      <div className="permission-card">
        <div className="permission-icon-wrapper">
          <div className="permission-icon bluetooth-icon">
            <BluetoothIcon />
          </div>
        </div>

        <h2 className="permission-title">
          Permitir conexión Bluetooth
        </h2>
        <p className="permission-description">
          BitChat necesita conectarse a dispositivos cercanos para enviar y recibir mensajes de forma segura.
        </p>

        <div className="bluetooth-info-card">
          <div className="info-item">
            <div className="info-icon"><DiscoverIcon /></div>
            <div className="info-item-content">
              <h4>Descubre usuarios cercanos</h4>
              <p>Encuentra personas a tu alrededor para chatear.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon" style={{color: '#879bff'}}><MeshIcon /></div>
             <div className="info-item-content">
              <h4>Crea conexiones de red mesh</h4>
              <p>Mensajería sin internet ni servidores.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><OfflineIcon /></div>
            <div className="info-item-content">
              <h4>Funciona sin internet</h4>
              <p>Comunicación directa entre dispositivos.</p>
            </div>
          </div>
        </div>

        <div className="permission-actions">
          <button className="permission-btn primary" onClick={() => handleAction('allow')}>
            Permitir
          </button>
          <button className="permission-btn tertiary" onClick={() => handleAction('deny')}>
            Ahora no
          </button>
        </div>

        <div className="permission-note">
          <PrivacyIcon />
          <span>Solo se conectará cuando tú lo autorices. Puedes desactivarlo en cualquier momento.</span>
        </div>
      </div>
    </div>
  );
};

export default BluetoothPermission;
