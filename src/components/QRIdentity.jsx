import { useState, useEffect } from 'react'
import './QRIdentity.css'

const QRIdentity = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

return (
  <div className="qr-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Identidad QR">
    <div
      className={`qr-container ${isVisible ? 'visible' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
        <div className="qr-header">
          <h2 className="qr-title">Escanea este código para confirmar mi identidad en Bitchat</h2>
        </div>

        <div className="qr-content">
          <div className="qr-code">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <rect width="200" height="200" fill="white"/>
              <rect x="10" y="10" width="20" height="20" fill="black"/>
              <rect x="40" y="10" width="10" height="10" fill="black"/>
              <rect x="60" y="10" width="10" height="10" fill="black"/>
              <rect x="80" y="10" width="20" height="20" fill="black"/>
              <rect x="110" y="10" width="10" height="10" fill="black"/>
              <rect x="130" y="10" width="10" height="10" fill="black"/>
              <rect x="150" y="10" width="10" height="10" fill="black"/>
              <rect x="170" y="10" width="20" height="20" fill="black"/>

              <rect x="10" y="40" width="10" height="10" fill="black"/>
              <rect x="30" y="40" width="10" height="10" fill="black"/>
              <rect x="50" y="40" width="20" height="20" fill="black"/>
              <rect x="80" y="40" width="10" height="10" fill="black"/>
              <rect x="100" y="40" width="10" height="10" fill="black"/>
              <rect x="120" y="40" width="20" height="20" fill="black"/>
              <rect x="150" y="40" width="10" height="10" fill="black"/>
              <rect x="170" y="40" width="10" height="10" fill="black"/>

              <rect x="10" y="70" width="10" height="10" fill="black"/>
              <rect x="30" y="70" width="20" height="20" fill="black"/>
              <rect x="60" y="70" width="10" height="10" fill="black"/>
              <rect x="80" y="70" width="10" height="10" fill="black"/>
              <rect x="100" y="70" width="20" height="20" fill="black"/>
              <rect x="130" y="70" width="10" height="10" fill="black"/>
              <rect x="150" y="70" width="20" height="20" fill="black"/>
              <rect x="180" y="70" width="10" height="10" fill="black"/>

              <rect x="10" y="100" width="20" height="20" fill="black"/>
              <rect x="40" y="100" width="10" height="10" fill="black"/>
              <rect x="60" y="100" width="20" height="20" fill="black"/>
              <rect x="90" y="100" width="10" height="10" fill="black"/>
              <rect x="110" y="100" width="10" height="10" fill="black"/>
              <rect x="130" y="100" width="20" height="20" fill="black"/>
              <rect x="160" y="100" width="10" height="10" fill="black"/>
              <rect x="180" y="100" width="10" height="10" fill="black"/>

              <rect x="10" y="130" width="10" height="10" fill="black"/>
              <rect x="30" y="130" width="10" height="10" fill="black"/>
              <rect x="50" y="130" width="20" height="20" fill="black"/>
              <rect x="80" y="130" width="10" height="10" fill="black"/>
              <rect x="100" y="130" width="20" height="20" fill="black"/>
              <rect x="130" y="130" width="10" height="10" fill="black"/>
              <rect x="150" y="130" width="10" height="10" fill="black"/>
              <rect x="170" y="130" width="20" height="20" fill="black"/>

              <rect x="10" y="160" width="20" height="20" fill="black"/>
              <rect x="40" y="160" width="10" height="10" fill="black"/>
              <rect x="60" y="160" width="10" height="10" fill="black"/>
              <rect x="80" y="160" width="20" height="20" fill="black"/>
              <rect x="110" y="160" width="10" height="10" fill="black"/>
              <rect x="130" y="160" width="20" height="20" fill="black"/>
              <rect x="160" y="160" width="10" height="10" fill="black"/>
              <rect x="180" y="160" width="10" height="10" fill="black"/>

              <rect x="15" y="15" width="10" height="10" fill="white"/>
              <rect x="175" y="15" width="10" height="10" fill="white"/>
              <rect x="15" y="175" width="10" height="10" fill="white"/>
            </svg>
          </div>

          <div className="qr-description">
            <p className="qr-text">
              Comparte este código para que otros te agreguen y verifiquen que eres tú
            </p>
            <p className="qr-note">
              Este QR solo comparte tu clave pública, nunca tus datos privados
            </p>
          </div>
        </div>

        <div className="qr-actions">
          <button className="qr-button primary" aria-label="Escanear código QR de otra persona">Escanear QR de otra persona</button>
          <button className="qr-button secondary" onClick={handleClose} aria-label="Compartir mi código QR">Compartir QR</button>
        </div>
      </div>
    </div>
  )
}

export default QRIdentity
