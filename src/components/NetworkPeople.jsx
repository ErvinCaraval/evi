import { useState, useEffect } from 'react';
import './NetworkPeople.css';
import { mockUsers } from '../utils/mockData';

const NetworkPeople = ({ onClose, showToast }) => {
  const [peers, setPeers] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState(null);

  useEffect(() => {
    // Initialize peers with random positions
    const initialPeers = mockUsers.slice(0, 5).map(user => ({
      ...user,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));
    setPeers(initialPeers);

    // Animate peers every few seconds
    const interval = setInterval(() => {
      setPeers(prevPeers => prevPeers.map(p => ({
        ...p,
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePeerClick = (peer) => {
    setSelectedPeer(peer.id);
    showToast(`Estás viendo a ${peer.name}`, 'info');
    setTimeout(() => setSelectedPeer(null), 2000); // Highlight for 2 seconds
  }

  return (
    <div className="network-people">
      <div className="network-overlay" onClick={onClose}></div>
      <div className="network-panel">
        <div className="network-header">
          <h2 className="network-title">MAPA DE LA RED</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="network-map-container">
          <div className="network-map">
            {/* User's node */}
            <div className="network-node user-node">
              <span>Tú</span>
            </div>

            {/* Peer nodes */}
            {peers.map(peer => (
              <div
                key={peer.id}
                className={`network-node peer-node ${selectedPeer === peer.id ? 'selected' : ''}`}
                style={{ top: peer.top, left: peer.left }}
                onClick={() => handlePeerClick(peer)}
              >
                <span>{peer.name.charAt(0)}</span>
                <div className="peer-label">{peer.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="network-footer-info">
            <p>Esta es una visualización en tiempo real de los dispositivos conectados a tu alrededor. Cada círculo representa a una persona en la red.</p>
            <span>Actualmente hay {peers.length} personas conectadas.</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkPeople;
