import './DotsMenu.css'

const DotsMenu = ({ onClose }) => {
  return (
    <div className="dots-menu-overlay" onClick={onClose}>
      <div className="dots-menu-panel" onClick={(e) => e.stopPropagation()}>
        <div className="dots-menu-header">
          <div className="dots-icon-large">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="2" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <circle cx="18" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="dots-menu-title">Opciones avanzadas</h3>
        </div>

        <div className="dots-menu-content">
          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Editar perfil</span>
              <span className="dots-option-subtitle">Cambiar nombre y avatar</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Fondos de chat</span>
              <span className="dots-option-subtitle">Personalizar apariencia</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Mensajes guardados</span>
              <span className="dots-option-subtitle">Ver mensajes favoritos</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 2v4M15 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Historial de actividad</span>
              <span className="dots-option-subtitle">Ver registros recientes</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Ubicación compartida</span>
              <span className="dots-option-subtitle">Administrar permisos</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="dots-divider"></div>

          <button className="dots-option-item">
            <div className="dots-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2" fill="none"/>
                <path d="M12 16v-4m0-4h.01"
                      stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dots-option-content">
              <span className="dots-option-title">Ayuda y soporte</span>
              <span className="dots-option-subtitle">Preguntas frecuentes</span>
            </div>
            <svg className="chevron-right" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <button className="dots-menu-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default DotsMenu
