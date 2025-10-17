import { useState } from 'react'
import './SquareMenu.css'

const SquareMenu = ({ onClose, showToast }) => {
  const [toggles, setToggles] = useState({
    availability: true,
    notifications: true,
    darkMode: true,
    privacy: true
  })

  const handleToggle = (key, title) => {
    setToggles(prev => {
      const newState = !prev[key]
      showToast(`${title} ${newState ? 'activado' : 'desactivado'}`, 'info')
      return { ...prev, [key]: newState }
    })
  }

  return (
    <div className="square-menu-overlay" onClick={onClose}>
      <div className="square-menu-panel" onClick={(e) => e.stopPropagation()}>
        <div className="square-menu-header">
          <div className="square-icon-large">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h3 className="square-menu-title">Configuración rápida</h3>
        </div>

        <div className="square-menu-content">
          <div className="quick-setting-item">
            <div className="setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                <path d="M12 6V12L16 14" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="setting-info">
              <span className="setting-title">Disponibilidad</span>
              <span className="setting-subtitle">Actualmente disponible</span>
            </div>
            <div className={`setting-toggle ${toggles.availability ? 'active' : ''}`}
                 onClick={() => handleToggle('availability', 'Disponibilidad')}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="quick-setting-item">
            <div className="setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="setting-info">
              <span className="setting-title">Notificaciones</span>
              <span className="setting-subtitle">Sonido activado</span>
            </div>
            <div className={`setting-toggle ${toggles.notifications ? 'active' : ''}`}
                 onClick={() => handleToggle('notifications', 'Notificaciones')}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="quick-setting-item">
            <div className="setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                      stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="setting-info">
              <span className="setting-title">Modo oscuro</span>
              <span className="setting-subtitle">Tema predeterminado</span>
            </div>
            <div className={`setting-toggle ${toggles.darkMode ? 'active' : ''}`}
                 onClick={() => handleToggle('darkMode', 'Modo oscuro')}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="quick-setting-item">
            <div className="setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="setting-info">
              <span className="setting-title">Privacidad</span>
              <span className="setting-subtitle">Cifrado end-to-end</span>
            </div>
            <div className={`setting-toggle ${toggles.privacy ? 'active' : ''}`}
                 onClick={() => handleToggle('privacy', 'Privacidad')}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        <button className="square-menu-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default SquareMenu
