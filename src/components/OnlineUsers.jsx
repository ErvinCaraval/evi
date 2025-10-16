import './OnlineUsers.css'

const OnlineUsers = ({ users, onUserSelect, onFavorite, onBlock, onClose }) => {
  const defaultUsers = users || [
    { id: 1, name: 'Anon64', status: 'online' },
    { id: 2, name: 'Usuario 1', status: 'online' },
    { id: 3, name: 'Usuario 5', status: 'online' }
  ]

  return (
    <div className="online-users-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Usuarios en línea">
      <div className="online-users-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="online-sheet-header">
          <div className="sheet-handle"></div>
          <h3 className="online-sheet-title">Usuarios en línea</h3>
          <span className="online-count">{defaultUsers.length} conectados</span>
        </div>

        <div className="online-users-list">
          {defaultUsers.map((user) => (
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

        <button className="online-sheet-cancel" onClick={onClose} aria-label="Cerrar lista de usuarios en línea">
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default OnlineUsers
