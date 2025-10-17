import { useState } from 'react'
import './BatteryOptimization.css'

const BatteryOptimization = ({ onNext }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleDisable = () => {
    onNext()
  }

  const handleCheckAgain = () => {
    console.log('Checking battery optimization...')
  }

  const handleSkip = () => {
    onNext()
  }

  return (
    <div className={`battery-optimization ${isVisible ? 'visible' : ''}`}>
      <div className="battery-content">
        <div className="battery-header">
          <h1 className="battery-title">bitchat</h1>
        </div>

        <div className="battery-icon-container">
          <svg className="battery-icon" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="20" y="40" width="70" height="50" rx="8" fill="#FF6B6B" fillOpacity="0.2" stroke="#FF6B6B" strokeWidth="3"/>
            <rect x="90" y="52" width="10" height="26" rx="2" fill="#FF6B6B"/>
            <path d="M35 65L55 65" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="75" cy="65" r="8" fill="#FF6B6B"/>
            <path d="M70 65L74 69L80 61" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="battery-status-card">
          <h2 className="status-title">Mejora tu experiencia de chat</h2>

          <p className="status-description">
            Para que BitChat funcione mejor, necesitamos que desactives la optimización de batería. 
            Esto nos permite mantener las conexiones activas y que recibas todos los mensajes a tiempo.
          </p>

          <p className="status-recommendation">
            No te preocupes, BitChat está optimizado para usar poca batería.
          </p>

          <div className="benefits-box">
            <h3 className="benefits-title">¿Qué mejora esto?</h3>
            <ul className="benefits-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Recibes todos los mensajes</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Conexión siempre activa</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--accent-primary)" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Funciona en segundo plano</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="battery-actions">
          <button className="disable-btn primary" onClick={handleDisable}>
            Desactivar optimización
          </button>

          <div className="secondary-actions">
            <button className="check-btn secondary" onClick={handleCheckAgain}>
              Verificar otra vez
            </button>
            <button className="skip-btn secondary" onClick={handleSkip}>
              Omitir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BatteryOptimization
