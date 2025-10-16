import React from 'react';
import './MessageContextMenu.css';

const MessageContextMenu = ({ position, onClose, onCopy, onReply, onReact, onDelete, message }) => {
  const menuStyle = {
    top: position.y,
    left: position.x,
  };

  const handleAction = (action) => {
    action();
    onClose();
  };

  return (
    <>
      <div className="context-menu-overlay" onClick={onClose} />
      <div className="message-context-menu" style={menuStyle}>
        <button className="context-menu-item" onClick={() => handleAction(onReply)}>
          <span className="context-menu-icon">↩️</span>
          Responder
        </button>
        <button className="context-menu-item" onClick={() => handleAction(onReact)}>
          <span className="context-menu-icon">😊</span>
          Reaccionar
        </button>
        <button className="context-menu-item" onClick={() => handleAction(onCopy)}>
          <span className="context-menu-icon">📋</span>
          Copiar
        </button>
        {message.sender === 'me' && (
          <button className="context-menu-item delete" onClick={() => handleAction(onDelete)}>
            <span className="context-menu-icon">🗑️</span>
            Eliminar
          </button>
        )}
      </div>
    </>
  );
};

export default MessageContextMenu;