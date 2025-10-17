
import { useState, useEffect, useRef } from 'react';
import './ChatScreen.css';
import ClearMessages from './ClearMessages';
import ContactActions from './ContactActions';
import OnlineUsers from './OnlineUsers';
import BlockedContact from './BlockedContact';
import FloatingMenu from './FloatingMenu';
import HugAnimation from './HugAnimation';
import PrivateMessage from './PrivateMessage';
import QRIdentity from './QRIdentity';
import CommandSuggestions from './CommandSuggestions';
import TypingHint from './TypingHint';
import { mockUsers, mockMessages, generateRandomReply } from '../utils/mockData';

const ChatScreen = ({ onOpenChannels, onOpenNetwork, showToast }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showClearMessages, setShowClearMessages] = useState(false);
  const [showContactActions, setShowContactActions] = useState(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [showBlockedContact, setShowBlockedContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState('anon64');
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showHugAnimation, setShowHugAnimation] = useState(false);
  const [showPrivateMessage, setShowPrivateMessage] = useState(false);
  const [showQRIdentity, setShowQRIdentity] = useState(false);
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showTypingHint, setShowTypingHint] = useState(false);
  const hintTimeoutRef = useRef(null);
  const [actionContext, setActionContext] = useState(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const text = message.trim();
    if (text.startsWith('/')) {
      setMessage('');
      setShowCommandSuggestions(false);
      return;
    }
    const newMessage = { id: Date.now(), text: message.trim(), time: new Date().toLocaleTimeString(), sender: 'me', status: 'sending' };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setTimeout(() => {
      const reply = { id: Date.now() + 1, text: generateRandomReply(), time: new Date().toLocaleTimeString(), sender: selectedContact, status: 'sent' };
      setMessages(prev => [...prev.map(m => m.id === newMessage.id ? { ...m, status: 'sent' } : m), reply]);
    }, 1000);
  };

  const handleCommandInput = (value) => {
    setMessage(value);
    if (value.startsWith('/')) {
      setShowCommandSuggestions(true);
      setShowTypingHint(false);
    } else {
      setShowCommandSuggestions(false);
      if (value.length > 0) {
        setShowTypingHint(true);
        if (hintTimeoutRef.current) {
          clearTimeout(hintTimeoutRef.current);
        }
        hintTimeoutRef.current = setTimeout(() => {
          setShowTypingHint(false);
        }, 2000);
      } else {
        setShowTypingHint(false);
      }
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (message.length === 0) {
        setShowTypingHint(true);
        if (hintTimeoutRef.current) {
          clearTimeout(hintTimeoutRef.current);
        }
        hintTimeoutRef.current = setTimeout(() => {
          setShowTypingHint(false);
        }, 2000);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setShowTypingHint(false);
     if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
    }
  };
  
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const handleInitiateAction = (action) => {
    setActionContext(action);
    setShowOnlineUsers(true);
    setShowContactActions(false);
  };

  const handleUserSelection = (user) => {
    const userName = user.name || 'este usuario'; // Use user.name for clarity

    if (actionContext) {
      switch (actionContext) {
        case 'favorite':
          showToast(`Has añadido a ${userName} a tus favoritos.`, 'success');
          break;
        case 'block':
          showToast(`Has bloqueado a ${userName}.`, 'success');
          break;
        case 'remove':
          showToast(`Has eliminado a ${userName} de tus contactos.`, 'success');
          break;
        default:
          setSelectedContact(userName);
          showToast(`Ahora estás chateando con ${userName}.`);
          break;
      }
    } else {
      // Fallback if no action context is set
      setSelectedContact(userName);
      showToast(`Ahora estás chateando con ${userName}.`);
    }

    setShowOnlineUsers(false);
    setActionContext(null);
  };

  const handleAddAttachment = () => setShowContactActions(true);
  const handleClearMessages = () => { setMessages([]); setShowClearMessages(false); showToast('Mensajes eliminados', 'success'); };
  const handleUnblockContact = () => showToast(`${selectedContact} ha sido desbloqueado.`, 'success');
  const handleSelectCommand = (command) => { setMessage(command.split(' ')[0] + ' '); setShowCommandSuggestions(false); document.querySelector('.message-input')?.focus(); };
  const handleSendPrivateMessage = (msg, recipient) => showToast('Mensaje privado enviado', 'success');

  return (
    <>
      <div className="chat-screen">
         <div className="chat-header"> 
          <div className="header-left">
            <h1 className="chat-title">bitchat</h1>
            <span className="user-name">/@anon9680</span>
          </div>
          <div className="header-right">
            <button className="header-btn" onClick={onOpenChannels} title="Cambiar de canal"><span className="mesh-label">#mesh</span></button>
            <button className="header-btn" onClick={() => handleInitiateAction(null)} title="Ver usuarios conectados"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M16 11c1.66 0 3-1.34 3-3s-1.66-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.66-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="var(--text-secondary)"/></svg><span className="peer-count">0</span></button>
            <button className="header-btn" onClick={() => setShowQRIdentity(true)} title="Mostrar mi código QR"><svg width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2"/><path d="M14 14h3v3h-3zM18 14h3v3h-3zM14 18h3v3h-3z" fill="var(--text-secondary)"/></svg></button>
            <button className="header-btn menu-dots-btn" onClick={() => setShowFloatingMenu(true)} title="Ver más opciones"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="6" r="2" fill="var(--text-secondary)"/><circle cx="12" cy="12" r="2" fill="var(--text-secondary)"/><circle cx="12" cy="18" r="2" fill="var(--text-secondary)"/></svg></button>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'} ${msg.isSystem ? 'system-message' : ''}`}>
                {msg.text && <span className="message-text">{msg.text}</span>}
                <span className="message-time">[{msg.time}]</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <TypingHint show={showTypingHint} />
          {showCommandSuggestions && <CommandSuggestions input={message} onSelectCommand={handleSelectCommand} onClose={() => setShowCommandSuggestions(false)} />}
          <div className={`input-wrapper ${isInputFocused || message ? 'focused' : ''}`}>
            <button className="attach-btn" onClick={handleAddAttachment} title="Más acciones"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round"/></svg></button>
            <input
              type="text"
              className="message-input"
              placeholder="Escribe un comando o mensaje..."
              value={message}
              onChange={(e) => handleCommandInput(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-btn" onClick={handleSendMessage} title="Enviar mensaje"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="var(--accent-primary)"/></svg></button>
          </div>
        </div>
      </div>

      {/* Modals and other overlays */}
      {showClearMessages && <ClearMessages onConfirm={handleClearMessages} onCancel={() => setShowClearMessages(false)} showToast={showToast} />}
      {showContactActions && <ContactActions contactName={selectedContact} onClose={() => setShowContactActions(false)} onViewOnline={() => handleInitiateAction(null)} onFavorite={() => handleInitiateAction('favorite')} onBlock={() => handleInitiateAction('block')} onRemove={() => handleInitiateAction('remove')} onClearMessages={() => { setShowContactActions(false); setShowClearMessages(true); }} />}
      {showOnlineUsers && <OnlineUsers onClose={() => { setShowOnlineUsers(false); setActionContext(null); }} onUserSelect={handleUserSelection} showToast={showToast} actionContext={actionContext} />}
      {showBlockedContact && <BlockedContact contactName={selectedContact} onUnblock={handleUnblockContact} onClose={() => setShowBlockedContact(false)} showToast={showToast} />}
      {showFloatingMenu && <FloatingMenu onClose={() => setShowFloatingMenu(false)} showToast={showToast} />}
      {showHugAnimation && <HugAnimation contactName={selectedContact} onClose={() => setShowHugAnimation(false)} />}
      {showPrivateMessage && <PrivateMessage contactName={selectedContact} onClose={() => setShowPrivateMessage(false)} onSend={(msg) => handleSendPrivateMessage(msg, selectedContact)} />}
      {showQRIdentity && <QRIdentity onClose={() => setShowQRIdentity(false)} />}
    </>
  );
};

export default ChatScreen;
