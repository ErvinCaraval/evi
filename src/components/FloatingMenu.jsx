import { useState, useEffect } from 'react'
import './FloatingMenu.css'

const FloatingMenu = ({ contactName, position, onClose, onRemove, onViewOnline, onFavorite, onBlock, onSquareMenu, onDotsMenu }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [clickedButton, setClickedButton] = useState(null)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleAction = (action, buttonName) => {
    setClickedButton(buttonName)
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        action()
        onClose()
      }, 200)
    }, 300)
  }

  const handleIconClick = (iconName, action) => {
    setClickedButton(iconName)
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        if (action) {
          action()
        }
        onClose()
      }, 200)
    }, 300)
  }

return (
  <div className="floating-menu-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Menú rápido">
    <div
      className={`floating-menu ${isVisible ? 'visible' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
        <div className="floating-menu-header">
          <button
            className={`menu-option remove ${clickedButton === 'remove' ? 'clicked' : ''}`}
            onClick={() => handleAction(onRemove, 'remove')}
            aria-label="Quitar usuario"
          >
            <span className="option-text">Quitar</span>
          </button>
          <div className="contact-badge">
            <span className="contact-name">{contactName}</span>
          </div>
        </div>

        <div className="floating-menu-actions">
          <button
            className={`action-button online ${clickedButton === 'online' ? 'clicked' : ''}`}
            onClick={() => handleAction(onViewOnline, 'online')}
            aria-label="Ver usuarios en línea"
          >
            <span className="action-label">Usuarios Online (w)</span>
          </button>

          <button
            className={`action-button favorite ${clickedButton === 'favorite' ? 'clicked' : ''}`}
            onClick={() => handleAction(onFavorite, 'favorite')}
            aria-label="Agregar a favoritos"
          >
            <span className="action-label">Favorito</span>
          </button>

          <button
            className={`action-button block ${clickedButton === 'block' ? 'clicked' : ''}`}
            onClick={() => handleAction(onBlock, 'block')}
            aria-label="Bloquear usuario"
          >
            <span className="action-label">Bloquear</span>
          </button>
        </div>

        <div className="floating-menu-buttons">
          <button
            className={`icon-button square ${clickedButton === 'square' ? 'clicked' : ''}`}
            onClick={() => handleIconClick('square', onSquareMenu)}
            aria-label="Abrir menú de cuadrícula"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>

          <button
            className={`icon-button dots ${clickedButton === 'dots' ? 'clicked' : ''}`}
            onClick={() => handleIconClick('dots', onDotsMenu)}
            aria-label="Abrir menú de opciones"
          >
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
