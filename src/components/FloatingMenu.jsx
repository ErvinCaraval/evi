import { useState, useEffect } from 'react';
import './FloatingMenu.css';

const FloatingMenu = ({
  onClose,
  showToast
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleAction = (action, message) => {
    if (action) {
      action();
    }
    if (message) {
      showToast(message, 'info');
    }
    // Don't close for every action, maybe just for some
  };

  return (
    <div className="floating-menu-overlay" onClick={onClose}>
      <div
        className={`floating-menu ${isVisible ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="floating-menu-header">
          <span className="menu-title">Menú Principal</span>
        </div>

        <div className="floating-menu-divider"></div>

        {/* General Options */}
        <div className="floating-menu-section">
            <button className="dots-option-item" onClick={() => { handleAction(null, 'Abriendo editor de perfil...'); onClose(); }}>
                <span className="dots-option-title">Editar mi perfil</span>
            </button>
             <button className="dots-option-item" onClick={() => { handleAction(null, 'Abriendo mensajes guardados...'); onClose(); }}>
                <span className="dots-option-title">Mensajes guardados</span>
            </button>
            <button className="dots-option-item" onClick={() => { handleAction(null, 'Cargando fondos de chat...'); onClose(); }}>
                <span className="dots-option-title">Fondos de chat</span>
            </button>
        </div>

        <div className="floating-menu-divider"></div>

        {/* Settings */}
        <div className="floating-menu-section">
            <button className="dots-option-item" onClick={() => { handleAction(null, 'Cambiando a modo oscuro...'); onClose(); }}>
                <span className="dots-option-title">Activar Modo Oscuro</span>
            </button>
            <button className="dots-option-item" onClick={() => { handleAction(null, 'Abriendo configuración...'); onClose(); }}>
                <span className="dots-option-title">Configuración</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default FloatingMenu;
