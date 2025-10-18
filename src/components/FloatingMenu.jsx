
import { useState, useEffect } from 'react';
import './FloatingMenu.css';
import Settings from './Settings';
import UserProfile from './UserProfile';
import SavedMessages from './SavedMessages';
import ChatBackgrounds from './ChatBackgrounds'; // Import the new component

const FloatingMenu = ({
  onClose,
  showToast
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentView, setCurrentView] = useState('menu');

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
  };

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <Settings onBack={() => setCurrentView('menu')} />;
      case 'userProfile':
        return <UserProfile onBack={() => setCurrentView('menu')} />;
      case 'savedMessages':
        return <SavedMessages onBack={() => setCurrentView('menu')} />;
      case 'chatBackgrounds': // Add new case for ChatBackgrounds
        return <ChatBackgrounds onBack={() => setCurrentView('menu')} />;
      default:
        return (
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
                <button className="dots-option-item" onClick={() => { handleAction(() => setCurrentView('userProfile'), 'Abriendo editor de perfil...'); }}>
                    <span className="dots-option-title">Editar mi perfil</span>
                </button>
                 <button className="dots-option-item" onClick={() => { handleAction(() => setCurrentView('savedMessages'), 'Abriendo mensajes guardados...'); }}>
                    <span className="dots-option-title">Mensajes guardados</span>
                </button>
                <button className="dots-option-item" onClick={() => { handleAction(() => setCurrentView('chatBackgrounds'), 'Cargando fondos de chat...'); }}>
                    <span className="dots-option-title">Fondos de chat</span>
                </button>
            </div>

            <div className="floating-menu-divider"></div>

            {/* Settings */}
            <div className="floating-menu-section">
                <button className="dots-option-item" onClick={() => { handleAction(null, 'Cambiando a modo oscuro...'); onClose(); }}>
                    <span className="dots-option-title">Activar Modo Oscuro</span>
                </button>
                <button className="dots-option-item" onClick={() => { handleAction(() => setCurrentView('settings'), 'Abriendo configuración...'); }}>
                    <span className="dots-option-title">Configuración</span>
                </button>
            </div>

          </div>
        );
    }
  };

  return (
    <div className="floating-menu-overlay" onClick={currentView === 'menu' ? onClose : null}>
      {renderContent()}
    </div>
  );
};

export default FloatingMenu;
