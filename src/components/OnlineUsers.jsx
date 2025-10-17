import { useState, useEffect } from 'react'
import './OnlineUsers.css'
import { mockUsers } from '../utils/mockData'

const OnlineUsers = ({ onUserSelect, onClose, showToast }) => {
  const [onlineUsers, setOnlineUsers] = useState(mockUsers.slice(0, 3))

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prevUsers => {
        const onlineIds = new Set(prevUsers.map(u => u.id));
        const offlineUsers = mockUsers.filter(u => !onlineIds.has(u.id));

        // Decide whether to add or remove a user
        if (prevUsers.length < 2 || (Math.random() > 0.4 && offlineUsers.length > 0)) {
          // Add a user
          const userToAdd = offlineUsers[Math.floor(Math.random() * offlineUsers.length)];
          showToast(`${userToAdd.name} se ha conectado`, 'info');
          return [...prevUsers, userToAdd];
        } else {
          // Remove a user
          const userToRemove = prevUsers[Math.floor(Math.random() * prevUsers.length)];
          showToast(`${userToRemove.name} se ha desconectado`, 'info');
          return prevUsers.filter(user => user.id !== userToRemove.id);
        }
      });
    }, 3000); // Change user list every 3 seconds

    return () => clearInterval(interval);
  }, [showToast]);

  return (
    <div className="online-users-overlay" onClick={onClose}>
      <div className="online-users-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="online-sheet-header">
          <div className="drag-handle"></div>
          <h3 className="online-sheet-title">Usuarios en línea</h3>
          <span className="online-count">{onlineUsers.length} conectados</span>
        </div>

        <div className="online-users-list">
          {onlineUsers.map((user) => (
            <button
              key={user.id}
              className="online-user-item"
              onClick={() => onUserSelect && onUserSelect(user.name)}
            >
              <div className="user-avatar">
                <div className="avatar-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="status-indicator online"></div>
              </div>
              <div className="user-info">
                <span className="user-name-text">{user.name}</span>
                <span className="user-status">En línea</span>
              </div>
              <svg className="chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>

        <div className="online-sheet-footer">
            <button className="online-sheet-cancel" onClick={onClose}>
                Cerrar
            </button>
        </div>
      </div>
    </div>
  )
}

export default OnlineUsers
