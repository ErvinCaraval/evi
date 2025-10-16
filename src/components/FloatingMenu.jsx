import { useState, useEffect } from 'react'
import './FloatingMenu.css'

const FloatingMenu = ({ contactName, position, onClose, onRemove, onViewOnline, onFavorite, onBlock }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleAction = (action) => {
    setIsVisible(false)
    setTimeout(() => {
      action()
      onClose()
    }, 200)
  }

  return (
    <div className="floating-menu-overlay" onClick={onClose}>
      <div
        className={`floating-menu ${isVisible ? 'visible' : ''}`}
        style={{ top: position?.y || '50%', left: position?.x || '50%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="floating-menu-header">
          <button className="menu-option remove" onClick={() => handleAction(onRemove)}>
            <span className="option-text">Quitar</span>
          </button>
          <div className="contact-badge">
            <span className="contact-name">{contactName}</span>
          </div>
        </div>

        <div className="floating-menu-actions">
          <button className="action-button online" onClick={() => handleAction(onViewOnline)}>
            <span className="action-label">Usuarios Online (w)</span>
          </button>

          <button className="action-button favorite" onClick={() => handleAction(onFavorite)}>
            <span className="action-label">Favorito</span>
          </button>

          <button className="action-button block" onClick={() => handleAction(onBlock)}>
            <span className="action-label">Bloquear</span>
          </button>
        </div>

        <div className="floating-menu-buttons">
          <button className="icon-button square">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>

          <button className="icon-button dots">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="2" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <circle cx="18" cy="12" r="2" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FloatingMenu
